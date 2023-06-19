import asyncio
from aiohttp import ClientSession


async def create_order(data):
    async with ClientSession() as session:
        async with session.post(
            'http://localhost:8080/create_order',
            json=data
        ) as response:
            pass


data = [
    {
        "items": [
            {
                "sku": "4b33fcc98ea1f59d6fe4eb2e0a48bb4b",
                "amount": 2
            },
            {
                "sku": "3e646181f6f708edd3326c1626c12d23",
                "amount": 1
            },
            {
                "sku": "25ada3fea95cadbcba7b8e6e90ee8ccd",
                "amount": 3
            }
        ]
    },
    {
        "items": [
            {
                "sku": "d48f3211c1ffccdc374f23139a9ab668",
                "amount": 1
            },
            {
                "sku": "097917e584151c0c21f205b2c3aafa10",
                "amount": 3
            },
            {
                "sku": "25ada3fea95cadbcba7b8e6e90ee8ccd",
                "amount": 1
            }
        ]
    },
    {
        "items": [
            {
                "sku": "f7aee6fad1070805563ae4320c4c8104",
                "amount": 2
            },
            {
                "sku": "024bdfbbb9aa09f64957c88d9f88f6dc",
                "amount": 2
            },
            {
                "sku": "56199cf6aae3d2327cb0041f100b0505",
                "amount": 2
            }
        ]
    }
]

loop = asyncio.get_event_loop()
for order in data:
    loop.run_until_complete(create_order(order))
