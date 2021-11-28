// TODO: Resolve issue with .env values not being loaded here
// Solution may be here: https://stackoverflow.com/questions/53426486/best-practice-to-use-config-service-in-nestjs-module

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CommentEntity } from "./comments/comment.entity";
import { PostEntity } from "./posts/post.entity";
import { UserEntity } from "./users/user.entity";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: "nestjs-blog",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [UserEntity, PostEntity, CommentEntity],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
  synchronize: process.env.NODE_ENV === "development",
  keepConnectionAlive: true,
};

export default config;
