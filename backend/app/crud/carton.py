from http import HTTPStatus
from typing import Optional

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.carton import Carton

BASE_CARTON = 'NONPACK'


class CRUDCarton(CRUDBase):
    
    async def get_carton_by_barcode(
        self,
        barcode: int,
        session: AsyncSession
    ) -> Optional[Carton]:
        """Получает упаковку по коду."""
        carton = await session.execute(
            select(self.model).where(self.model.barcode == barcode)
        )
        carton = carton.scalars().first()
        if carton is None:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST,
                detail=f'Упаковка с кодом {barcode} не существует.'
            )
        return carton

    async def get_carton_by_type(
        self,
        name: str,
        session: AsyncSession
    ) -> Carton:
        """Получает упаковку по названию, при отсутствии возвращает NONPACK."""
        carton = await session.execute(
            select(Carton).where(Carton.cartontype == name)
        )
        carton = carton.scalars().first()
        if carton is None:
            carton = await session.execute(
                select(Carton).where(
                    Carton.cartontype == BASE_CARTON
                )
            )
            carton = carton.scalars().first()
        return carton


carton_crud = CRUDCarton(Carton)
