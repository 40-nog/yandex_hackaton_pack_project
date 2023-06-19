from http import HTTPStatus

from aiohttp import ClientError, ClientSession
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.crud.carton import BASE_CARTON, carton_crud
from app.crud.item import item_crud
from app.models import OrderCarton
from app.models.order import Order

STATUS = '/health'
PACK = '/pack'
STATUS_URL = settings.pack_service_url + STATUS
PACK_URL = settings.pack_service_url + PACK


async def get_best_pack(
    order: Order,
    data: dict,
    session: AsyncSession
) -> None:
    """Запрашивает лучшую упаковку и сохраняет её в заказ."""
    bestpack_data = {'carton': BASE_CARTON}
    try:
        async with ClientSession() as http_session:
            async with http_session.get(STATUS_URL) as response:
                if response.status == HTTPStatus.OK:
                    async with http_session.get(
                        PACK_URL,
                        json=data
                    ) as response:
                        bestpack_data = await response.json()
    except ClientError as error:
        f'Упаковка не получена. '
        f'Ошибка при выполнении HTTP запроса: {error}'
    if isinstance(bestpack_data, dict):
        cartontype = bestpack_data.get('carton', BASE_CARTON)
    elif isinstance(bestpack_data, list) and bestpack_data:
        cartontype = bestpack_data[0]
    else:
        cartontype = bestpack_data
    carton = await carton_crud.get_carton_by_type(
        cartontype, session
    )
    order_carton = OrderCarton(
        order=order,
        carton=carton,
        amount=1
    )
    session.add(order_carton)
    if 'wrappers' in bestpack_data:
        wrappers = bestpack_data['wrappers']
        for wrapper in wrappers:
            if 'sku' in wrapper and 'wrapper' in wrapper:
                for wrap in wrappers:
                    await item_crud.get_wrapper(
                        wrap['sku'],
                        wrap['wrapper'],
                        session
                    )
