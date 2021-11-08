import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Comment as CommentModel, Prisma } from "@prisma/client";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async comment(
    CommentWhereUniqueInput: Prisma.CommentWhereUniqueInput
  ): Promise<CommentModel | null> {
    return this.prisma.comment.findUnique({
      where: CommentWhereUniqueInput,
    });
  }

  async comments(params: {
    where?: Prisma.CommentWhereInput;
  }): Promise<CommentModel[]> {
    const { where } = params;
    return this.prisma.comment.findMany({
      where,
    });
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<CommentModel> {
    return this.prisma.comment.create({
      data,
    });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<CommentModel> {
    const { data, where } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

  async deleteComment(
    where: Prisma.CommentWhereUniqueInput
  ): Promise<CommentModel> {
    return this.prisma.comment.delete({
      where,
    });
  }
}
