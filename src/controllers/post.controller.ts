import { Controller, Get, Param, Post, Body, Delete } from "@nestjs/common";
import { Post as PostModel, Comment as CommentModel } from "@prisma/client";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/post.service";

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Get("posts")
  async getPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
  }

  @Get("post/:id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get("post/:id/comments")
  async getCommentsByPostId(@Param("id") id: string): Promise<CommentModel[]> {
    return this.commentService.comments({
      where: {
        postId: Number(id),
      },
    });
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(
    @Param("searchString") searchString: string
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            body: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post("post")
  async createPost(
    @Body() postData: { title: string; body?: string; userId: number }
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

  @Delete("post/:id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
