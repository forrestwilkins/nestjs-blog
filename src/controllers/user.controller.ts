import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { User as UserModel, Post as PostModel } from "@prisma/client";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get(":id/posts")
  async getPosts(@Param("id") id: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        userId: Number(id),
      },
    });
  }

  @Post()
  async signupUser(
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Patch(":id")
  async updateUser(
    @Param() { id }: { id: string },
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: {
        id: Number(id),
      },
      data: userData,
    });
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
