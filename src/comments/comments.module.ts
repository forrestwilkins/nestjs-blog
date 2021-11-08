import { Module } from "@nestjs/common";
import { CommentsController } from "src/comments/comments.controller";
import { CommentsService } from "src/comments/comments.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
