import { Module } from "@nestjs/common";
import { CommentService } from "src/services/comment.service";
import { PostService } from "src/services/post.service";
import { PrismaService } from "src/services/prisma.service";
import { UserService } from "src/services/user.service";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    PostService,
    CommentService,
  ],
})
export class AppModule {}
