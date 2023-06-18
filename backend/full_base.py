import asyncio
import csv
from random import choice, randint

from sqlalchemy import select

from app.core.db import AsyncSessionLocal
from app.crud.carton import carton_crud
from app.crud.order import order_crud, TimeStamp
from app.models import (
    CargoItem, OrderCarton, OrderItem, Payload
)
from app.models.cargotype import CargoType
from app.models.carton import Carton
from app.models.item import Item
from app.models.order import Order, Status

CARTON_BARCODE = 100

CARTONS = [
    'MYB', 'MYC', 'NONPACK', 'YMC', 'MYD', 'YMG',
    'MYA', 'YMF', 'YMW', 'YMA', 'YME', 'STRETCH', 'MYE',
    'YML', 'MYF', 'YMX', 'MYB',
]


async def create_cartons(barcode):
    async with AsyncSessionLocal() as session:
        with open('data/carton.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                carton = Carton(
                    cartontype=row[0],
                    length=float(row[1]),
                    width=float(row[2]),
                    height=float(row[3]),
                    price=float(row[5]),
                    barcode=barcode
                )
                barcode += 10
                session.add(carton)
            await session.commit()


async def create_cargotypes():
    async with AsyncSessionLocal() as session:
        with open(
            'data/cargotype_info.csv', 'r', encoding='utf-8'
        ) as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                cargotype = CargoType(
                    code=int(row[1]),
                    description=', '.join(row[2:])
                )
                session.add(cargotype)
            await session.commit()


async def create_items():
    async with AsyncSessionLocal() as session:
        with open('data/items.txt', 'r', encoding='utf-8') as file:
            for row in file.readlines():
                row = row.split(',')
                item = Item(
                    sku=row[0],
                    name=row[1],
                    a=float(row[2]),
                    b=float(row[3]),
                    c=float(row[4]),
                    image='/images/' + row[6][:-1],
                    weight=float(row[5]),
                )
                for _ in range(3):
                    pk = randint(1, 50)
                    cargotype = await session.execute(
                        select(CargoType).where(CargoType.id == pk)
                    )
                    cargotype = cargotype.scalars().first()
                    cargoitem = CargoItem()
                    cargoitem.cargotype = cargotype
                    item.cargotypes.append(cargoitem)
                    session.add(cargoitem)
                session.add(item)
            await session.commit()


async def create_orders():
    async with AsyncSessionLocal() as session:
        order = Order(
            status = Status.FORMING,
        )
        for pk in range(1, 9):
            item = await session.execute(
                select(Item).where(Item.id == pk)
            )
            item = item.scalars().first()
            orderitem = OrderItem(
                barcode=randint(100_000_000, 999_999_999)
            )
            orderitem.item = item
            order.items.append(orderitem)
        for pk in range(1, 3):
            item = await session.execute(
                select(Item).where(Item.id == pk)
            )
            item = item.scalars().first()
            orderitem = OrderItem(
                barcode=randint(100_000_000, 999_999_999)
            )
            orderitem.item = item
            order.items.append(orderitem)
        for pk in range(5, 7):
            item = await session.execute(
                select(Item).where(Item.id == pk)
            )
            item = item.scalars().first()
            orderitem = OrderItem(
                barcode=randint(100_000_000, 999_999_999)
            )
            orderitem.item = item
            order.items.append(orderitem)
        carton = await carton_crud.get_carton_by_type(
            choice(CARTONS), session
        )
        ordercarton = OrderCarton(amount=1)
        ordercarton.carton = carton
        order.cartons.append(ordercarton)
        session.add(ordercarton)
        count = {}
        for assoc in order.items:
            item_id = assoc.item.id
            count[item_id] = count.get(item_id, 0) + 1
        for key, value in count.items():
            payload = Payload(order=order, item_id=key, amount=value)
            session.add(payload)
        await order_crud.change_order_status(
            order, Status.FORMING, TimeStamp.CREATED
        )
        session.add(order)
        await session.commit()


loop = asyncio.get_event_loop()
loop.run_until_complete(create_cartons(CARTON_BARCODE))
loop.run_until_complete(create_cargotypes())
loop.run_until_complete(create_items())
loop.run_until_complete(create_orders())
