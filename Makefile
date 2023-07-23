start:
	docker compose -f scripts/mongo/docker-compose.yml up -d
	docker exec -it mongodb-cluster-1 mongosh --eval "rs.initiate({_id:\"mongodb-cluster\",members:[{_id:0,host:\"mongodb-cluster-1:27017\"},{_id:1,host:\"mongodb-cluster-2:27017\"},{_id:2,host:\"mongodb-cluster-3:27017\"}]})"
	docker compose -f scripts/kafka/docker-compose.yml up -d

down:
	docker compose -f scripts/mongo/docker-compose.yml down
	rm -rf ./scripts/mongo/data
	docker compose -f scripts/kafka/docker-compose.yml down
	docker compose down

# Path: scripts/kafka
start-mongo:
	docker compose -f scripts/mongo/docker-compose.yml up -d
	docker exec -it mongodb-cluster-1 mongosh --eval "rs.initiate({_id:\"mongodb-cluster\",members:[{_id:0,host:\"mongodb-cluster-1:27017\"},{_id:1,host:\"mongodb-cluster-2:27017\"},{_id:2,host:\"mongodb-cluster-3:27017\"}]})"

start-kafka:
	docker compose -f scripts/kafka/docker-compose.yml up -d
down-kafka:
	docker compose -f scripts/kafka/docker-compose.yml down
down-mongo:
	docker compose -f scripts/mongo/docker-compose.yml down
	rm -rf ./scripts/mongo/data