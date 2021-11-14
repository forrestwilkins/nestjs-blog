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
import { UsersService } from "./users.service";
import { PostsService } from "../posts/posts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @Get(":id/posts")
  async getPosts(@Param("id") id: string): Promise<PostModel[]> {
    return this.postsService.posts({
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
    return this.usersService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateUser(
    @Param() { id }: { id: string },
    @Body() userData: { name: string; password: string }
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: {
        id: Number(id),
      },
      data: userData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
