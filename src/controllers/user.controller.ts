import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { User as UserModel, Post as PostModel } from "@prisma/client";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @Get("users")
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get("user/:id")
  async getUserById(@Param("id") id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get(["user/:id/posts"])
  async getPosts(@Param("id") id: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        userId: Number(id),
      },
    });
  }

  @Post("user")
  async signupUser(
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
