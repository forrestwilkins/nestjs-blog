import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Post as PostModel, Prisma } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<PostModel | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: { where?: Prisma.PostWhereInput }): Promise<PostModel[]> {
    const { where } = params;
    return this.prisma.post.findMany({
      where,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<PostModel> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<PostModel> {
    return this.prisma.post.delete({
      where,
    });
  }
}
