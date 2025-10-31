run_dev:
	docker compose -f docker-compose.dev.yml down && docker compose -f docker-compose.dev.yml up --build

run_prod:
	docker compose up --build

run_backend:
	cd backend && docker build -t back_premaut .
	cd backend && docker run -p 3001:3001 -v "$PWD:/app" -v /app/node_modules --name backend back_premaut 

run_front:
	cd frontend && npm run dev

run_test_back:
	docker compose -f docker-compose.dev.yml build --no-cache backend-test
	docker compose -f docker-compose.dev.yml run --rm backend-test