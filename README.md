## Description

Blog backend built with NestJS and Prisma

A walkthrough for this project is available at [WALKTHROUGH.md](WALKTHROUGH.md).

## Installation

```bash
# Install Yarn
$ npm install -g yarn

# Install dependencies
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
```

## Test

```bash
# Run tests
$ yarn test

# Test coverage
$ yarn test:cov
```

## Resources used

- [Next-Generation & Fully Type-Safe ORM for NestJS - Prisma](https://www.prisma.io/nestjs)
- [NestJS Crash Course - Marius Espejo | YT](https://www.youtube.com/watch?v=2n3xS89TJMI)
- [NestJS in 100 Seconds - Fireship | YT](https://www.youtube.com/watch?v=0M8AYU_hPas)
- [NestJS docs](https://docs.nestjs.com)
- [Prisma docs](https://www.prisma.io/docs)
