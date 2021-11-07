import { Module } from "@nestjs/common";
import { PostController } from "src/controllers/post.controller";
import { PostService } from "src/services/post.service";
import { CommentModule } from "./comment.module";

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
