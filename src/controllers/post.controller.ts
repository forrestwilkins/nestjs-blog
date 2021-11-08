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
import { Post as PostModel, Comment as CommentModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/post.service";

@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
  }

  @Get(":id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get(":id/comments")
  async getCommentsByPostId(@Param("id") id: string): Promise<CommentModel[]> {
    return this.commentService.comments({
      where: {
        postId: Number(id),
      },
    });
  }

  @Get("search/:query")
  async getFilteredPosts(@Param("query") query: string): Promise<PostModel[]> {
    return this.postService.posts({
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
    return this.postService.createPost({
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
    return this.postService.updatePost({
      where: {
        id: Number(id),
      },
      data: postData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
