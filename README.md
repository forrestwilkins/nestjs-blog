## Description

Blog backend built with NestJS and Prisma

## Installation

```bash
# Install Yarn
$ npm install -g yarn

# Start the app locally
$ yarn install

# Add .env file with DATABASE_URL and run migrations
$ npx prisma migrate dev

# Enable pre-commit hook with Husky
$ npx husky install && npx husky add .husky/pre-commit "yarn lint-staged"

# JWT_KEY will also have to be set in .env for authentication
```

## Running the app

```bash
# Development
$ yarn start

# Watch mode
$ yarn start:dev
```

## Test

```bash
# Unit tests
$ yarn test

# Test coverage
$ yarn test:cov
```
