import { Controller, Get, Param, Post, Body, Delete } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";
import { User as UserModel, Post as PostModel } from "@prisma/client";

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @Get("post/:id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get("posts")
  async getPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
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

  @Post("user")
  async signupUser(
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Delete("post/:id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
