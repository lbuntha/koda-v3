from typing import Annotated

from fastapi import APIRouter, Depends

from app.schemas.health import HealthResponse
from app.services.health_service import HealthService, get_health_service

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check(
    health_service: Annotated[HealthService, Depends(get_health_service)],
) -> HealthResponse:
    return health_service.get_health()
