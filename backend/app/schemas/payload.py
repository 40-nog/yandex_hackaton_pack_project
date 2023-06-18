from pydantic import BaseModel
from pydantic.types import PositiveInt


class PayloadDB(BaseModel):
    """Схема количества товаров."""
    item_id: PositiveInt
    amount: PositiveInt

    class Config:
        orm_mode = True
