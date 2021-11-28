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
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PostEntity } from "../posts/post.entity";
import { UsersService } from "./users.service";
import { UserEntity } from "./user.entity";
import { PostsService } from "../posts/posts.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.users({});
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserEntity> {
    return this.usersService.user({ where: { id: Number(id) } });
  }

  @Get(":id/posts")
  async getPosts(@Param("id") id: string): Promise<PostEntity[]> {
    return this.postsService.posts({
      where: { userId: Number(id) },
    });
  }

  // TODO: Log in user with AuthService on sign up
  @Post()
  async signupUser(
    @Body() userData: { name: string; password: string }
  ): Promise<UserEntity> {
    return this.usersService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateUser(
    @Param() { id }: { id: string },
    @Body() userData: { name: string; password: string }
  ): Promise<UpdateResult> {
    return this.usersService.updateUser({
      where: {
        id: Number(id),
      },
      data: userData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<DeleteResult> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
