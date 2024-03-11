# `purchases` Microservice (Node Fastify, REST, MongoDB)

This is a Node v21 service running on a REST API with a MongoDB database. It has an example endpoint to get all purchases for a user.

## Getting started

You can add your own MongoDB connection string to the .env file and then run this service like this:

```bash
  $ nvm install 21.6.1 # Install this project's Node version 21.6.1
  $ nvm use # Use the recommended Node version

  $ npm i # install dependencies
  $ npm run build # first build
  $ npm run start # run server with nodemon
```

## Run tests

This service uses Jest for automated tests:

```bash
  $ npm run test
```

## Port

Listen on http port `8080`

## Endpoints

This service has the example API endpoint `/user/:userId` (GET):

```bash
GET /user/123 HTTP/1.1
Host: localhost:8080
x-user-id: 123
x-client-id: shop
```

## System design
<img width="1015" alt="image" src="https://github.com/0bubbles0/purchases/assets/77367593/e5b03f98-c9d4-457d-a6a4-295298f6deee">

