import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User as UserModel, Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: { where?: Prisma.UserWhereInput }): Promise<UserModel[]> {
    const { where } = params;
    return this.prisma.user.findMany({
      where,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserModel> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
    return this.prisma.user.delete({
      where,
    });
  }
}
