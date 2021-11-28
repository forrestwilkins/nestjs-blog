// TODO: Install and set up Bcrypt - Should not save passwords as plain text

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../users/user.entity";
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
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.user({ where: { name } });
    if (user && user.password === password) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({
    id,
    name,
  }: Partial<UserEntity>): Promise<{ access_token: string }> {
    const payload = { username: name, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
