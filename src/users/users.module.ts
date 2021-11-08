import { Module } from "@nestjs/common";
import { UsersController } from "src/users/users.controller";
import { UsersService } from "src/users/users.service";
import { PostsModule } from "../posts/posts.module";

@Module({
  imports: [PostsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
