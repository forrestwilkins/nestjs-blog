import { Module } from "@nestjs/common";
import { CommentController } from "src/controllers/comment.controller";
import { PostController } from "src/controllers/post.controller";
import { UserController } from "src/controllers/user.controller";
import { CommentService } from "src/services/comment.service";
import { PostService } from "src/services/post.service";
import { PrismaService } from "src/services/prisma.service";
import { UserService } from "src/services/user.service";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PostController,
    CommentController,
  ],
  providers: [
    PrismaService,
    AppService,
    UserService,
    PostService,
    CommentService,
  ],
})
export class AppModule {}
