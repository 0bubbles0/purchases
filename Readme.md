# `purchases` microservice for an online shop

This is an API service with an example http endpoint to get all purchases for a certain user.

## Tech stack

- Node v21 (TypeScript)
- API architectural style: REST http
- Data format: JSON
- Database: MongoDB
- Testing: Jest

## Getting started

You can add your own MongoDB connection string to the .env file and then run this service like this:

```bash
  $ nvm install 21.6.1 # Install this project's Node version 21.6.1
  $ nvm use # Use the recommended Node version

  $ npm i # install dependencies
  $ npm run build # first build
  $ npm run start # run server, or npm run dev to run in watch mode
```

## Run tests

This service uses Jest for automated tests:

```bash
  $ npm run test
```

It's currently integration tests for the endpoints, unit tests should follow in future.

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

## The product

I imagined this microservice as a part of an online shop. It has two web-apps: the `shop` for customers, and an internal `customer-support` platform.

### Feature use cases

- As a customer, I want to see a list my past purchases
- As customer support staff, a customer had a question about a past purchase. I don't know the purchaseId, so want a list of purchases for this customer
- As a customer, I should not be allowed to view a list of other people's purchases!
- If I have not purchased anything yet, the list should be empty, not an error

### System design diagram

<img width="1015" alt="image" src="https://github.com/0bubbles0/purchases/assets/77367593/e5b03f98-c9d4-457d-a6a4-295298f6deee">

## Future possible steps

### Features

- enable filter, sort and pagination on requests
- other sibling microservices (e.g. invoicing service) want to query this endpoint to generate an invoice for a user.

### System

- deploy: services to AWS, managed database provider (so they automatically scale)
- logging
- observability: montior RED, observability
- security: https encryption, authorization headers (e.g. JWT Bearer)
- scaling considerations: database (indexes, Redis cache), multiple service containers
- performance monitoring: needs load balancing (traffic) and rate limiting (attack)
