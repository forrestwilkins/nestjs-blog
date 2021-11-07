import { Module } from "@nestjs/common";
import { CommentController } from "src/controllers/comment.controller";
import { CommentService } from "src/services/comment.service";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
