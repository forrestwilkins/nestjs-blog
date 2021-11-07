import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { PostModule } from "./post.module";

@Module({
  imports: [PostModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
