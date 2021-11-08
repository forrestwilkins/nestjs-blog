import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Controller,
  UseGuards,
} from "@nestjs/common";
import { User as UserModel, Post as PostModel } from "@prisma/client";
import { UserService } from "../services/user.service";
import { PostService } from "../services/post.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  @UseGuards(JwtAuthGuard)
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

  // TODO: Log in user with AuthService on sign up
  @Post()
  async signupUser(
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
