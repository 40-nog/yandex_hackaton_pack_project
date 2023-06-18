from http import HTTPStatus

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


class CRUDBase:
    def __init__(self, model):
        self.model = model

    async def get_by_id(
        self,
        obj_id: int,
        session: AsyncSession
    ):
        """Получает объект из БД по его id."""
        obj = await session.execute(
            select(self.model).where(self.model.id == obj_id)
        )
        obj = obj.scalars().first()
        if obj is None:
            raise HTTPException(
                status_code=HTTPStatus.BAD_REQUEST,
                detail=f'Объект c id {obj_id} не существует.'
            )
        return obj
