import asyncpg
import asyncio

async def drop_type():
    conn = await asyncpg.connect(user="postgres", password="postgres", host="db", port="5432", database="postgres")
    await conn.execute("DROP TYPE IF EXISTS status;")
    await conn.close()

asyncio.run(drop_type())
