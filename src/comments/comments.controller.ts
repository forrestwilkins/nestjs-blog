import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CommentEntity } from "./comment.entity";
import { CommentsService } from "./comments.service";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(): Promise<CommentEntity[]> {
    return this.commentsService.comments({});
  }

  @Get(":id")
  async getCommentById(@Param("id") id: string): Promise<CommentEntity> {
    return this.commentsService.comment({ where: { id: Number(id) } });
  }

  @Get(":id/replies")
  async getRepliesByCommentId(
    @Param("id") id: string
  ): Promise<CommentEntity[]> {
    return this.commentsService.comments({
      where: {
        commentId: Number(id),
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @Body()
    commentData: {
      body: string;
      userId: number;
      postId?: number;
      commentId?: number;
    }
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateComment(
    @Param() { id }: { id: string },
    @Body() commentData: { body: string }
  ): Promise<UpdateResult> {
    return this.commentsService.updateComment({
      where: {
        id: Number(id),
      },
      data: commentData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteComment(@Param("id") id: string): Promise<DeleteResult> {
    return this.commentsService.deleteComment({ id: Number(id) });
  }
}
