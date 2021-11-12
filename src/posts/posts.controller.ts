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
import { Post as PostModel, Comment as CommentModel } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CommentsService } from "../comments/comments.service";
import { PostsService } from "./posts.service";

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return this.postsService.posts({});
  }

  @Get(":id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postsService.post({ id: Number(id) });
  }

  @Get(":id/comments")
  async getCommentsByPostId(@Param("id") id: string): Promise<CommentModel[]> {
    return this.commentsService.comments({
      where: {
        postId: Number(id),
      },
    });
  }

  @Get("search/:query")
  async getFilteredPosts(@Param("query") query: string): Promise<PostModel[]> {
    return this.postsService.posts({
      where: {
        OR: [
          {
            title: { contains: query },
          },
          {
            body: { contains: query },
          },
        ],
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() postData: { title: string; body: string; userId: number }
  ): Promise<PostModel> {
    const { title, body, userId } = postData;
    return this.postsService.createPost({
      title,
      body,
      user: {
        connect: { id: userId },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param() { id }: { id: string },
    @Body() postData: { title: string; body: string }
  ): Promise<PostModel> {
    return this.postsService.updatePost({
      where: {
        id: Number(id),
      },
      data: postData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postsService.deletePost({ id: Number(id) });
  }
}
