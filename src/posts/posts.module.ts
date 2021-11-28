import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { CommentsModule } from "../comments/comments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, TypeOrmModule],
})
export class PostsModule {}
