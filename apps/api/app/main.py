from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_v1_router
from app.core.config import get_settings
from app.db.mongodb import close_mongo_client, connect_to_mongo


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name, version=settings.app_version)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_v1_router, prefix="/api/v1")

    @app.on_event("startup")
    async def startup() -> None:
        await connect_to_mongo(settings)

    @app.on_event("shutdown")
    async def shutdown() -> None:
        await close_mongo_client()

    return app


app = create_app()
