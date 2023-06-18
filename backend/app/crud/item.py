from http import HTTPStatus
from typing import Optional

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.item import Item

class CRUDItem(CRUDBase):
    
    async def get_item_by_sku(
        self,
        sku: str,
        session: AsyncSession
    ) -> Optional[Item]:
        """Получает товар из БД по его sku."""
        item = await session.execute(
            select(self.model).where(self.model.sku == sku)
        )
        item = item.scalars().first()
        if item is None:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST,
                detail=f'Товара с sku {sku} нет на складе.'
            )
        return item

    async def get_wrapper(
        self,
        sku: str,
        wrapper: str,
        session: AsyncSession
    ) -> None:
        """Присваивает обёртку товару."""
        item = await item_crud.get_item_by_sku(
            sku, session
        )
        setattr(item, 'package_type', wrapper)


item_crud = CRUDItem(Item)
