from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import Settings

_client: AsyncIOMotorClient[dict] | None = None
_database: AsyncIOMotorDatabase[dict] | None = None


async def connect_to_mongo(settings: Settings) -> None:
    global _client, _database

    _client = AsyncIOMotorClient(settings.mongodb_uri)
    _database = _client[settings.mongodb_db]


async def close_mongo_client() -> None:
    global _client, _database

    if _client is not None:
        _client.close()

    _client = None
    _database = None


def get_database() -> AsyncIOMotorDatabase[dict]:
    if _database is None:
        raise RuntimeError("MongoDB has not been initialized")

    return _database
