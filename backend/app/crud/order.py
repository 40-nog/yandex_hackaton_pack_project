from datetime import datetime
from enum import StrEnum
from http import HTTPStatus
from random import randint
from typing import Optional

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.utils import get_best_pack
from app.crud.base import CRUDBase
from app.crud.carton import carton_crud
from app.crud.item import item_crud
from app.models import OrderItem, Payload, UsedCarton
from app.models.order import Order, Status
from app.schemas.order import OrderCreate, OrderUpdate


class TimeStamp(StrEnum):
    CREATED = 'created'
    START_PACKING = 'start_packing'
    CLOSED = 'closed'


class CRUDOrder(CRUDBase):

    async def create_order(
        self,
        data_in: OrderCreate,
        session: AsyncSession
    ) -> Optional[Order]:
        """Создаёт новый заказ."""
        create_data = data_in.dict()
        order = Order()
        for product in create_data['items']:
            sku = product['sku']
            item = await item_crud.get_item_by_sku(
                sku, session
            )
            amount = product['amount']
            for _ in range(amount):
                orderitem = OrderItem(
                    order=order,
                    item=item,
                    barcode=randint(100_000_000, 999_999_999)
                )
                order.items.append(orderitem)
            payload = Payload(
                order=order,
                item_id=item.id,
                amount=amount
            )
            session.add(payload)
        ds_data = await order.for_pack_data(create_data)
        await get_best_pack(order, ds_data, session)
        await order_crud.change_order_status(
            order, Status.FORMING, TimeStamp.CREATED
        )
        session.add(order)
        await session.commit()
        await session.refresh(order)
        return order

    async def get_another_order(
        self,
        session: AsyncSession
    ) -> Optional[Order]:
        """Получает из БД очередной заказ."""
        orders = await session.execute(
            select(self.model).where(
                self.model.status == Status.FORMING
            ).order_by(self.model.created)
        )
        order = orders.scalars().first()
        if order is None:
            raise HTTPException(
                status_code=HTTPStatus.NO_CONTENT,
                detail='Свободные заказы не найдены.'
            )
        await order_crud.change_order_status(
            order, Status.PACKING, TimeStamp.START_PACKING
        )
        await session.commit()
        await session.refresh(order)
        return order

    async def update_order(
        self,
        db_obj: Order,
        obj_in: OrderUpdate,
        session: AsyncSession
    ) -> Optional[Order]:
        """Обновляет параметры заказа после упаковки."""
        if not db_obj.status == Status.PACKING:
            raise HTTPException(
                status_code=HTTPStatus.FORBIDDEN,
                detail='Этот заказ не находится в процессе упаковки.'
            )
        update_data = obj_in.dict(exclude_unset=True)
        db_obj.is_completed = update_data['is_completed']
        db_obj.user_id = update_data['user_id']
        if 'comment' in update_data:
            db_obj.comment = update_data['comment']
        used_cartons = {}
        for pack in update_data['used_cartons']:
            used_cartons[pack] = used_cartons.get(pack, 0) + 1
        for code, amount in used_cartons.items():
            carton = await carton_crud.get_carton_by_barcode(
                code, session
            )
            used_carton = UsedCarton(
                order=db_obj,
                carton=carton,
                amount=amount
            )
            db_obj.used_cartons.append(used_carton)
        status = Status.COMPLETED
        if not update_data['is_completed']:
            status = Status.CANCELLED
        await order_crud.change_order_status(
            db_obj, status, TimeStamp.CLOSED
        )
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def change_order_status(
        self,
        obj: Order,
        new_status: str,
        stamp: TimeStamp
    ) -> None:
        """Изменяет статус заказа в БД."""
        setattr(obj, 'status', new_status)
        setattr(obj, stamp, datetime.now())


order_crud = CRUDOrder(Order)
