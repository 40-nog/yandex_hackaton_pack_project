from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Extra, Field
from pydantic.types import PositiveInt

from app.schemas.carton import CartonOrder
from app.schemas.item import ItemFrontend, ItemIncoming
from app.schemas.payload import PayloadDB


class OrderBase(BaseModel):
    order_id: Optional[PositiveInt]


class OrderFrontend(OrderBase):
    """Схема отправки заказа на фронтенд."""
    cartons: list[CartonOrder]
    items: list[ItemFrontend]
    payload: list[PayloadDB]


class OrderResult(OrderBase):
    """Схема возврата результаов обновления заказа на фронтенд"""
    closed: datetime
    is_completed: bool
    user_id: str = Field(..., min_length=1, max_length=256)
    comment: Optional[str]
    used_cartons: list[CartonOrder]


class OrderCreate(BaseModel):
    """Схема создания нового заказа"""
    items: list[ItemIncoming]


class OrderUpdate(BaseModel):
    """Схема получения результатов упаковки заказа с фронтенда."""
    is_completed: bool
    user_id: str = Field(..., min_length=1, max_length=256)
    comment: Optional[str]
    used_cartons: list[PositiveInt]

    class Config:
        extra = Extra.forbid
