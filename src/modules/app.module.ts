import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { CommentModule } from "./comment.module";
import { PostModule } from "./post.module";
import { PrismaModule } from "./prisma.module";
import { UserModule } from "./user.module";

@Module({
  imports: [UserModule, PostModule, CommentModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
