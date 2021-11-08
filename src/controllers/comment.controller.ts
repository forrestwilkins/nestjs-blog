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
import { Comment as CommentModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CommentService } from "src/services/comment.service";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(): Promise<CommentModel[]> {
    return this.commentService.comments({});
  }

  @Get(":id")
  async getCommentById(@Param("id") id: string): Promise<CommentModel> {
    return this.commentService.comment({ id: Number(id) });
  }

  @Get(":id/replies")
  async getRepliesByCommentId(
    @Param("id") id: string
  ): Promise<CommentModel[]> {
    return this.commentService.comments({
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
      body?: string;
      userId: number;
      postId?: number;
      commentId?: number;
    }
  ): Promise<CommentModel> {
    const { body, userId, postId, commentId } = commentData;
    const postConnect = postId
      ? {
          post: {
            connect: { id: postId },
          },
        }
      : undefined;
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
      ...postConnect,
      ...commentConnect,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateComment(
    @Param() { id }: { id: string },
    @Body() commentData: { body: string }
  ): Promise<CommentModel> {
    return this.commentService.updateComment({
      where: {
        id: Number(id),
      },
      data: commentData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteComment(@Param("id") id: string): Promise<CommentModel> {
    return this.commentService.deleteComment({ id: Number(id) });
  }
}
