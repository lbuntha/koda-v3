from app.core.config import get_settings
from app.schemas.health import HealthResponse


class HealthService:
    def get_health(self) -> HealthResponse:
        settings = get_settings()
        return HealthResponse(status="ok", service="koda-api", version=settings.app_version)


def get_health_service() -> HealthService:
    return HealthService()
