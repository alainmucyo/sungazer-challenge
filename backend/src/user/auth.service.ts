import { UserService } from "./user.service";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(username: string, password: string) {
    const user = await this.userService.findUserByUsername({ username });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
}
