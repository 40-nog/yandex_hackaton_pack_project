from pydantic import BaseModel, Field
from pydantic.types import PositiveInt


class CartonOrder(BaseModel):
    """Схема упаковки в заказе"""
    cartontype: str = Field(..., min_length=1, max_length=8)
    barcode: PositiveInt
