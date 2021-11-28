import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommentsModule } from "./comments/comments.module";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";
import config from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),

    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
