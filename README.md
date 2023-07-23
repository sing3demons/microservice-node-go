# nodejs_prisma

```
yarn init -y
npx tsc --init
yarn add -D typescript ts-node ts-node-dev @types/node @types/express
yarn add prisma -D
npx prisma init --datasource-provider mongodb
```

```install dependencies
yarn add express dotenv
yarn add @prisma/client
yarn add winston dayjs
yarn add kafkajs
```

### start mongodb #1

```start mongodb and
docker compose -f scripts/mongo/docker-compose.yml up -d
docker exec -it mongodb-cluster-1 mongosh --eval "rs.initiate({_id:\"mongodb-cluster\",members:[{_id:0,host:\"mongodb-cluster-1:27017\"},{_id:1,host:\"mongodb-cluster-2:27017\"},{_id:2,host:\"mongodb-cluster-3:27017\"}]})"
```

### generate prisma client #2

```prisma
npx prisma generate
```

### start kafka #3

```start kafka and
docker compose -f scripts/kafka/docker-compose.yml up -d
```

### start nodejs #4

```start app
docker compose up -d
```

### stop all #5

```down
docker compose down
docker compose -f scripts/mongo/docker-compose.yml down
rm -rf ./scripts/mongo/data
docker compose -f scripts/kafka/docker-compose.yml down
```

```cmd
yarn start
yarn build
yarn dev
```
