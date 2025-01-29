# Проект з прикладом контейнеризованого express сервера з Pug, PostgreSQL, TypeORM з міграціями

## Опис файлів:
/config
* custom-environment-variables.yml - mapping of ENV variables to config properties
* default.json - default config for any environments
* default.ts - dynamic ts config
* dev.json - config for dev environment, used when NODE_ENV=dev
* test.json - config for test environment, used when NODE_ENV=test

/src  - папка з текстом програми монтуется у контейнер node-server для hot reload
  /middleware
  * httpLogger - example of custom http logger
  /migrations
  * 1736275927466-createUsers.ts - migration for users table
  * 1736276882038-createSales.ts - migration for sales table
  /models
  * User.ts - TypeORM model (entity) for user
  * Sale.ts - TypeORM model (entity) for sale
  /routes
  * userRouter.ts - router for CRUD for /api/v1/users
  /services
  * DatabaseService.ts - service for connect/disconnect to PostgreSQL database using TypeORM
  * UserService - CRUD service for users collection
  /utils
  * logger.ts - логгер
  * app.ts  - main express application file
  /views
  * index.pg - hello world using pug
  * app.ts - new user registration form view

Dockerfile and docker-compose.yml - файли для контейнерізації

## How to start:
  copy ".env.example" to ".env"

```
docker-compose up
```
open http://localhost:3000/

open http://localhost:3000/api/v1/users - users CRUD API


## How to run migrations:
### inside node-server container:
```
npm run typeorm migration:run
```
### from the project root:
```
docker-compose exec node-server npm run typeorm migration:run
```

## How to revert last migration:
### inside node-server container:
```
npm run typeorm migration:revert
```
### from the project root:
```
docker-compose exec node-server npm run typeorm migration:revert
```

## Show all typeorm cli commands:
### inside node-server container:
```
npm run typeorm
```
### from the project root:
```
docker-compose exec node-server npm run typeorm
```