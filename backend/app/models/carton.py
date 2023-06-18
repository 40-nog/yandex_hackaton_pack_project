from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models import *


class Carton(Base):
    """Модель упаковки."""
    cartontype: Mapped[str] = mapped_column(
        String(8),
        unique=True,
        nullable=False
    )
    length: Mapped[float]
    width: Mapped[float]
    height: Mapped[float]
    price: Mapped[float]
    barcode: Mapped[int] = mapped_column(unique=True)
    orders: Mapped[list['OrderCarton']] = relationship(
        back_populates='carton'
    )
    used_in_orders: Mapped[list['UsedCarton']] = relationship(
        back_populates='carton'
    )
