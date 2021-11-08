// TODO: Install and set up Bcrypt - Should not save passwords as plain text

import { User as UserModel } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    name: string,
    password: string
  ): Promise<Partial<UserModel>> {
    const user = await this.usersService.user({ name });
    if (user && user.password === password) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
