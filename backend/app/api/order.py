from http import HTTPStatus

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.crud.order import order_crud
from app.schemas.order import (
    OrderCreate, OrderFrontend, OrderResult, OrderUpdate
)

router = APIRouter()


@router.post(
    '/create_order',
    tags=['Create order'],
    summary='Формирование нового заказа'
)
async def get_order(
    products: OrderCreate,
    session: AsyncSession = Depends(get_async_session)
) -> dict[str, str]:
    """Формирует новый заказ."""
    await order_crud.create_order(products, session)
    return JSONResponse(
        content={'message': 'Заказ создан.'},
        status_code=HTTPStatus.CREATED
    )


@router.get(
    '/pack_order',
    tags=['Pack order'],
    summary='Отправка заказа на упаковку',
    response_model=OrderFrontend
)
async def pack_order(
    session: AsyncSession = Depends(get_async_session)
):
    """Отдаёт заказ на упаковку пользователю."""
    order = await order_crud.get_another_order(session)
    return await order.to_dict()


@router.patch(
    '/pack_order/{order_id}',
    tags=['Pack order'],
    summary='Получение результатов упаковки',
    response_model=OrderResult,
    response_model_exclude_unset=True
)
async def pack_result(
    order_id: int,
    obj_in: OrderUpdate,
    session: AsyncSession = Depends(get_async_session)
):
    """Получает результат упаковки заказа от пользователя."""
    order = await order_crud.get_by_id(order_id, session)
    updated_order = await order_crud.update_order(order, obj_in, session)
    return await updated_order.to_response()
