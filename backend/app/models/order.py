from datetime import datetime
from enum import StrEnum

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.orm import (
    Mapped, mapped_column, relationship
)

from app.core.db import Base
from app.models import *


class Status(StrEnum):
    """Класс статуса заказа."""
    FORMING = 'Формируется'
    PACKING = 'Собирается'
    COMPLETED = 'Выполнен'
    CANCELLED = 'Отменён'


class Order(Base):
    """Модель заказа."""
    created: Mapped[datetime] = mapped_column(nullable=True)
    start_packing: Mapped[datetime] = mapped_column(nullable=True)
    closed: Mapped[datetime] = mapped_column(nullable=True)
    status: Mapped[StrEnum] = mapped_column(
        ENUM(Status),
        nullable=True
    )
    user_id: Mapped[str] = mapped_column(String(256), nullable=True)
    is_completed: Mapped[bool] = mapped_column(default=False)
    comment: Mapped[str] = mapped_column(nullable=True)
    payload: Mapped[list['Payload']] = relationship(
        back_populates='order', lazy='selectin'
    )
    items: Mapped[list['OrderItem']] = relationship(
        back_populates='order', lazy='selectin'
    )
    cartons: Mapped[list['OrderCarton']] = relationship(
        back_populates='order', lazy='selectin'
    )
    used_cartons: Mapped[list['UsedCarton']] = relationship(
        back_populates='order', lazy='selectin'
    )

    async def to_dict(self) -> dict:
        """Формирует данные для отправки на фронтенд для упаковки."""
        cartons = []
        for ordercarton in self.cartons:
            cartons.append(
                {
                    'cartontype': ordercarton.carton.cartontype,
                    'barcode': ordercarton.carton.barcode,
                }
            )
        items = []
        for orderitem in self.items:
            items.append(
                {
                    'id': orderitem.item.id,
                    'name': orderitem.item.name,
                    'barcode': orderitem.barcode,
                    'image': orderitem.item.image,
                    'package_type': orderitem.item.package_type,
                }
            )
        payload = []
        for item in self.payload:
            payload.append(
                {
                    'item_id': item.item_id,
                    'amount': item.amount,
                }
            )
        data = {
            'order_id': self.id,
            'cartons': cartons,
            'items': items,
            'payload': payload,
        }
        return data

    async def to_response(self) -> dict:
        """Формирует ответ фронтенду после закрытия заказа."""
        cartons = []
        for ordercarton in self.used_cartons:
            cartons.append(
                {
                    'cartontype': ordercarton.carton.cartontype,
                    'barcode': ordercarton.carton.barcode,
                }
            )
        data = {
            'order_id': self.id,
            'is_completed': self.is_completed,
            'closed': self.closed,
            'user_id': self.user_id,
            'comment': self.comment,
            'used_cartons': cartons,
        }
        return data

    async def for_pack_data(self, create_data: dict) -> dict:
        """Формирует данные для сервиса подбора упаковки"""
        amount_dict = {
            item['sku']: item['amount'] for item in create_data['items']
        }
        items = []
        for orderitem in self.items:
            cargotypes = [
                cargoitem.cargotype.code for cargoitem
                in orderitem.item.cargotypes
            ]
            sku = orderitem.item.sku
            items.append(
                {
                    'sku': sku,
                    'amount': amount_dict[sku],
                    'weight': orderitem.item.weight,
                    'a': orderitem.item.a,
                    'b': orderitem.item.b,
                    'c': orderitem.item.c,
                    'cargotypes': cargotypes,
                }
            )
        data = {
            'order_id': self.id,
            'items': items,
        }
        return data
