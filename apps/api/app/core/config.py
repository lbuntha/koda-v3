from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Koda API"
    app_version: str = "0.1.0"
    api_environment: str = Field(default="local", alias="KODA_API_ENV")
    mongodb_uri: str = Field(default="mongodb://localhost:27017", alias="KODA_MONGODB_URI")
    mongodb_db: str = Field(default="koda_v3", alias="KODA_MONGODB_DB")
    cors_origins: list[str] = ["http://localhost:5173"]

    model_config = SettingsConfigDict(env_file=".env", populate_by_name=True)


@lru_cache
def get_settings() -> Settings:
    return Settings()
