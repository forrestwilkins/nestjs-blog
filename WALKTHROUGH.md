# Walkthrough

## NestJS

One of the main benefits of using NestJS is that it is an opinionated framework and provides an out-of-the-box application architecture, which translates into less time spent deciding whether to use this or that methodology, folder structure, or primary dependencies.

At a more granular level, NestJS also provides support for authorization with features like guards, which can easily be added to routes or entire controllers with custom decorators, or those supplied by NestJS. Guards have access to `ExecutionContext`, enabling them to know what will be executed next, and interpose logic throughout the request/response cycle declaratively.

## Passport

Passport is one of the most popular Node.js authentication libraries and is fairly straightforward to implement. It enables you to do the following:

- Authenticate a user by verifying their credentials
- Manage authenticated state by issuing a JWT or other portable token
- Attach information about the authenticated user to the `Request` object

All of this enables users to both login securely, as well as be assured that all of the API routes will then be protected by requiring some kind of token issued at time of login, which itself can even retain information about the current user session, as well as be updated periodically for added security.
