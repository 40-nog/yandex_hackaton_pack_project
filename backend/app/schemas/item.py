from typing import Optional

from pydantic import BaseModel, Field
from pydantic.types import PositiveInt


class ItemBase(BaseModel):
    pass


class ItemFrontend(ItemBase):
    """Схема товара в заказе для фронтенда"""
    id: PositiveInt
    name: str = Field(..., min_length=1)
    barcode: PositiveInt
    image: str = Field(..., min_length=1, max_length=512)
    package_type: Optional[str] = Field(..., min_length=1, max_length=256)


class ItemIncoming(ItemBase):
    """Схема товара для формирования нового заказа"""
    sku: str = Field(..., min_length=1, max_length=256)
    amount: PositiveInt
