from motor.motor_asyncio import AsyncIOMotorDatabase


class MongoRepository:
    def __init__(self, database: AsyncIOMotorDatabase[dict]) -> None:
        self.database = database
