from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models import *


class CargoType(Base):
    """Модель типа товара."""
    code: Mapped[int] = mapped_column(unique=True)
    description: Mapped[str] = mapped_column(String(256))
    items: Mapped[list['CargoItem']] = relationship(
        back_populates='cargotype'
    )
