from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models import *


class Item(Base):
    """Модель товара."""
    sku: Mapped[str] = mapped_column(
        String(256),
        unique=True,
        nullable=False
    )
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    a: Mapped[float] = mapped_column(default=0.0, nullable=False)
    b: Mapped[float] = mapped_column(default=0.0, nullable=False)
    c: Mapped[float] = mapped_column(default=0.0, nullable=False)
    image: Mapped[str] = mapped_column(String(512))
    weight: Mapped[float]
    package_type: Mapped[str] = mapped_column(
        String(256),
        nullable=True
    )
    cargotypes: Mapped[list['CargoItem']] = relationship(
        back_populates='item', lazy='selectin'
    )
    orders: Mapped[list['OrderItem']] = relationship(
        back_populates='item'
    )
