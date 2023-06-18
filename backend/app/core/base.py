"""Импорты класса Base и всех моделей для Alembic."""
from app.core.db import Base  # noqa
from app.models.associations import (
    CargoItem, OrderCarton, OrderItem, Payload, UsedCarton  # noqa
)
from app.models.cargotype import CargoType  # noqa
from app.models.carton import Carton  # noqa
from app.models.item import Item  # noqa
from app.models.order import Order, Status # noqa
