import { Module } from "@nestjs/common";
import { PostsController } from "src/posts/posts.controller";
import { PostsService } from "src/posts/posts.service";
import { CommentsModule } from "../comments/comments.module";

@Module({
  imports: [CommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
