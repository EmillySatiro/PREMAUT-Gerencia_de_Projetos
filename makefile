install_dependecias:
	cd backend && npm install
	cd frontend && npm install
	cd frontend && npm install recharts

run_dev:
	docker compose -f docker-compose.dev.yml down && docker compose -f docker-compose.dev.yml up --build

run_prod:
	docker compose up --build

run_backend_dev:
	cd backend && docker build -f Dockerfile.dev -t back_premaut .
	cd backend && docker run -p 3001:3001 -v "$PWD:/app" -v /app/node_modules --name backend back_premaut 

run_front_dev:
	cd frontend && docker build -f Dockerfile.dev -t front_premaut .
	cd frontend && docker run -p 3000:3000 --name frontend front_premaut

run_backend:
	cd backend && docker build -t back_premaut .
	cd backend && docker run -p 3001:3001 --name backend back_premaut 

run_front:
	cd frontend && docker build -t front_premaut .
	cd frontend && docker run -p 3000:3000 --name frontend front_premaut

run_test_back:
	docker compose -f docker-compose.dev.yml build --no-cache backend-test
	docker compose -f docker-compose.dev.yml run --rm backend-test