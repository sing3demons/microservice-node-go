start:
	docker compose -f scripts/mongo/docker-compose.yml up -d
	docker exec -it mongo1 mongosh --eval "rs.initiate({_id:\"my-replica-set\",members:[{_id:0,host:\"mongo1:27017\"},{_id:1,host:\"mongo2:27018\"},{_id:2,host:\"mongo3:27019\"}]})"
	docker compose -f scripts/kafka/docker-compose.yml up -d

down:
	docker compose -f scripts/mongo/docker-compose.yml down
	rm -rf ./scripts/mongo/data
	docker compose -f scripts/kafka/docker-compose.yml down
	docker compose down

# Path: scripts/kafka
start-mongo:
	docker compose -f scripts/mongo/docker-compose.yml up -d
	docker exec -it mongo1 mongosh --eval "rs.initiate({_id:\"my-replica-set\",members:[{_id:0,host:\"mongo1:27017\"},{_id:1,host:\"mongo2:27018\"},{_id:2,host:\"mongo3:27019\"}]})"

start-kafka:
	docker compose -f scripts/kafka/docker-compose.yml up -d
down-kafka:
	docker compose -f scripts/kafka/docker-compose.yml down
down-mongo:
	docker compose -f scripts/mongo/docker-compose.yml down
	rm -rf ./scripts/mongo/data

clean-volume:
	docker volume rm $(docker volume ls -q)