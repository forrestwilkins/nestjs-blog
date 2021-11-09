# Walkthrough

## NestJS

One of the main benefits of using NestJS is that it is an opinionated framework and provides an out-of-the-box application architecture, which translates into less time spent deciding whether to use this or that methodology, folder structure, or primary dependencies.

At a more granular level, NestJS also provides support for authorization with features like guards, which can easily be added to routes or entire controllers with custom decorators, or those supplied by NestJS. Guards have access to `ExecutionContext`, enabling them to know what will be executed next, and interpose logic throughout the request/response cycle declaratively.

## Prisma

Prisma supports a wide variety of databases and provides a new level of type-safety that goes much farther than other ORMs in the TS ecosystem, such as TypeORM or Sequelize. Prisma Client also meshes well with NestJS services, which enable you to encapsulate all of your business logic and database queries away from your controller routes, and with type-safety being a high priority for both, the two form a really great pair.

A good example of this would be the generated types you get from Prisma to ensure that the methods exposed by your services are properly typed, saving a great deal of time, as far as having to create additional interfaces or DTO (Data Transfer Object - defines how data will be sent over the network) files.

![alt text](https://www.prisma.io/images/stack_diagram.svg)

One more excellent feature of Prisma would be the declarative approach they take with their schema file, which greatly simplifies changes to models or tables in the DB. After making a change to the schema, you run a migration command, supplied by Prisma, that compares the schema to the current state of the DB, and then writes and executes SQL against the DB based on that comparison.

This is a step above ORMs like ActiveRecord, for instance, that requires the changes be passed in with the migration command itself. Extra tools or steps would then be required to get the sort of bird's eye view you get right away with a Prisma schema file.

The declarative approach taken with Prisma's schema file also pairs nicely with NestJS's use of decorators, which follow the declarative design pattern as well, all of which enables you to write more readable code that reflects what we actually want to see throughout the course of development.

## Passport

Passport is one of the most popular Node.js authentication libraries and is fairly straightforward to implement. It enables you to do the following:

- Authenticate a user by verifying their credentials
- Manage authenticated state by issuing a JWT or other portable token
- Attach information about the authenticated user to the `Request` object

All of this enables users to both login securely, as well as be assured that all of the API routes will then be protected by requiring some kind of token issued at time of login, which itself can even retain information about the current user session, as well as be updated periodically for added security.
