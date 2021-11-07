## Description

Blog built with NestJS and Prisma

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
```

## Running the app

```bash
# Development
$ yarn start

# Watch mode
$ yarn start:dev

# Production mode
$ yarn start:prod
```

## Test

```bash
# Unit tests
$ yarn test

# E2E tests
$ yarn test:e2e

# Test coverage
$ yarn test:cov
```
