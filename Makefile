COMPOSE := $(shell if docker compose version >/dev/null 2>&1; then echo "docker compose"; elif command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; fi)

.PHONY: dev-local dev-local-detached dev-local-stop dev-local-logs check-compose

check-compose:
	@if [ -z "$(COMPOSE)" ]; then \
		echo "Docker Compose is not available. Install Docker Desktop with Compose v2, or install legacy docker-compose."; \
		exit 1; \
	fi

dev-local: check-compose
	$(COMPOSE) up --build

dev-local-detached: check-compose
	$(COMPOSE) up --build -d

dev-local-stop: check-compose
	$(COMPOSE) down

dev-local-logs: check-compose
	$(COMPOSE) logs -f learner-web api mongodb
