import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CommentEntity } from "./comments/comment.entity";
import { PostEntity } from "./posts/post.entity";
import { UserEntity } from "./users/user.entity";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, PostEntity, CommentEntity],
  keepConnectionAlive: true,
};

export default config;
