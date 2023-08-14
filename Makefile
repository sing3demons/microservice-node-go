start: start-mongo mongo-init

start-all: start-mongo mongo-init start-kafka start-grafana start-fluent-bit start-app
	docker compose -f scripts/mongo/docker-compose.yml up -d
	sleep 5 && echo "Waiting for mongo to start"
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
mongo-init:
	docker exec -it mongo1 mongosh --eval "rs.initiate({_id:\"my-replica-set\",members:[{_id:0,host:\"mongo1:27017\"},{_id:1,host:\"mongo2:27018\"},{_id:2,host:\"mongo3:27019\"}]})"

start-kafka:
	docker compose -f scripts/kafka/docker-compose.yml up -d

start-grafana:
	docker compose -f scripts/grafana/docker-compose.yml up -d
start-fluent-bit:
	docker compose -f scripts/fluent-bit/docker-compose.yml up -d
start-metrics:
	docker compose -f scripts/prometheus/docker-compose.yml up -d

start-app:
	docker compose up -d --build
down-kafka:
	docker compose -f scripts/kafka/docker-compose.yml down
down-mongo:
	docker compose -f scripts/mongo/docker-compose.yml down
	rm -rf ./scripts/mongo/data
down-grafana:
	docker compose -f scripts/grafana/docker-compose.yml down
down-fluent-bit:
	docker compose -f scripts/fluent-bit/docker-compose.yml down
down-metrics:
	docker compose -f scripts/prometheus/docker-compose.yml down
down-app:
	docker compose down

clean-volume:
	docker volume rm $(docker volume ls -q)

keygen:
	mkdir src/keys
	ssh-keygen -t rsa -b 2048 -m PEM -f src/keys/rsa.key
	openssl rsa -in src/keys/rsa.key -pubout -outform PEM -out src/keys/rsa.key.pub

start-log : start-grafana start-fluent-bit

love : start-mongo mongo-init start-grafana start-fluent-bit start-metrics start-app 
	@echo "I love you"
kill : down-app down-grafana down-fluent-bit down-kafka down-mongo down-metrics
	@echo "I hate you"
