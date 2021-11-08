import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommentsModule } from "./comments/comments.module";
import { PostsModule } from "./posts/posts.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
