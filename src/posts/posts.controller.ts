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
import { DeleteResult, Like, UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CommentEntity } from "../comments/comment.entity";
import { CommentsService } from "../comments/comments.service";
import { PostEntity } from "./post.entity";
import { PostsService } from "./posts.service";

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return this.postsService.posts({});
  }

  @Get(":id")
  async getPostById(@Param("id") id: string): Promise<PostEntity> {
    return this.postsService.post({ where: { id: Number(id) } });
  }

  @Get(":id/comments")
  async getCommentsByPostId(@Param("id") id: string): Promise<CommentEntity[]> {
    return this.commentsService.comments({
      where: { postId: Number(id) },
    });
  }

  @Get("search/:query")
  async getFilteredPosts(@Param("query") query: string): Promise<PostEntity[]> {
    return this.postsService.posts({
      where: [
        {
          title: Like(`%${query}%`),
        },
        {
          body: Like(`%${query}%`),
        },
      ],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() postData: { userId: number; title: string; body: string }
  ): Promise<PostEntity> {
    const { userId, title, body } = postData;
    return this.postsService.createPost({
      userId,
      data: {
        title,
        body,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param() { id }: { id: string },
    @Body() postData: { title: string; body: string }
  ): Promise<UpdateResult> {
    return this.postsService.updatePost({
      where: {
        id: Number(id),
      },
      data: postData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deletePost(@Param("id") id: string): Promise<DeleteResult> {
    return this.postsService.deletePost({ id: Number(id) });
  }
}
