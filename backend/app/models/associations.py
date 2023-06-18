from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models.cargotype import CargoType
from app.models.carton import Carton
from app.models.item import Item
from app.models.order import Order


class Payload(Base):
    """Класс для хранения количества товара в заказе."""
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'),
        primary_key=True
    )
    order: Mapped['Order'] = relationship(
        back_populates='payload', lazy='selectin'
    )
    item_id: Mapped[int]
    amount: Mapped[int]


class CargoItem(Base):
    """Промежуточная таблица для связи товара и типа."""
    item_id: Mapped[int] = mapped_column(
        ForeignKey('item.id'),
        primary_key=True
    )
    cargotype_id: Mapped[int] = mapped_column(
        ForeignKey('cargotype.id'),
        primary_key=True
    )
    item: Mapped['Item'] = relationship(
        back_populates='cargotypes',
        lazy='selectin'
    )
    cargotype: Mapped['CargoType'] = relationship(
        back_populates='items',
        lazy='selectin'
    )


class OrderItem(Base):
    """Промежуточная таблица для связи товара и заказа."""
    item_id: Mapped[int] = mapped_column(
        ForeignKey('item.id'),
        primary_key=True
    )
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'),
        primary_key=True
    )
    item: Mapped['Item'] = relationship(
        back_populates='orders',
        lazy='selectin'
    )
    order: Mapped['Order'] = relationship(
        back_populates='items',
        lazy='selectin'
    )
    barcode: Mapped[int] = mapped_column(unique=True, nullable=False)


class OrderCarton(Base):
    """Промежуточная таблица для связи заказа и рекомендованной упаковки."""
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'),
        primary_key=True
    )
    carton_id: Mapped[int] = mapped_column(
        ForeignKey('carton.id'),
        primary_key=True
    )
    order: Mapped['Order'] = relationship(
        back_populates='cartons',
        lazy='selectin'
    )
    carton: Mapped['Carton'] = relationship(
        back_populates='orders',
        lazy='selectin'
    )
    amount: Mapped[int]


class UsedCarton(Base):
    """Промежуточная таблица для связи заказа и использованной упаковки."""
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'),
        primary_key=True
    )
    carton_id: Mapped[int] = mapped_column(
        ForeignKey('carton.id'),
        primary_key=True
    )
    order: Mapped['Order'] = relationship(
        back_populates='used_cartons',
        lazy='selectin'
    )
    carton: Mapped['Carton'] = relationship(
        back_populates='used_in_orders',
        lazy='selectin'
    )
    amount: Mapped[int]
