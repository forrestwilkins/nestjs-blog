import { Controller, Get, Param, Post, Body, Delete } from "@nestjs/common";
import { Comment as CommentModel } from "@prisma/client";
import { CommentService } from "src/services/comment.service";

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("comments")
  async getComments(): Promise<CommentModel[]> {
    return this.commentService.comments({});
  }

  @Get("comment/:id")
  async getCommentById(@Param("id") id: string): Promise<CommentModel> {
    return this.commentService.comment({ id: Number(id) });
  }

  @Get("comment/:id/replies")
  async getRepliesByCommentId(
    @Param("id") id: string
  ): Promise<CommentModel[]> {
    return this.commentService.comments({
      where: {
        commentId: Number(id),
      },
    });
  }

  @Post("comment")
  async createComment(
    @Body() commentData: { body?: string; userId: number; commentId?: number }
  ): Promise<CommentModel> {
    const { body, userId, commentId } = commentData;
    const commentConnect = commentId
      ? {
          comment: {
            connect: { id: commentId },
          },
        }
      : undefined;

    return this.commentService.createComment({
      body,
      user: {
        connect: { id: userId },
      },
      ...commentConnect,
    });
  }

  @Delete("comment/:id")
  async deleteComment(@Param("id") id: string): Promise<CommentModel> {
    return this.commentService.deleteComment({ id: Number(id) });
  }
}
