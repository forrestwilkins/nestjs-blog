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
import { Comment as CommentModel } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CommentsService } from "./comments.service";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(): Promise<CommentModel[]> {
    return this.commentsService.comments({});
  }

  @Get(":id")
  async getCommentById(@Param("id") id: string): Promise<CommentModel> {
    return this.commentsService.comment({ id: Number(id) });
  }

  @Get(":id/replies")
  async getRepliesByCommentId(
    @Param("id") id: string
  ): Promise<CommentModel[]> {
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

    return this.commentsService.createComment({
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
    return this.commentsService.updateComment({
      where: {
        id: Number(id),
      },
      data: commentData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteComment(@Param("id") id: string): Promise<CommentModel> {
    return this.commentsService.deleteComment({ id: Number(id) });
  }
}
