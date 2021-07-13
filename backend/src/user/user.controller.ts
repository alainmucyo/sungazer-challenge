import { UserService } from "./user.service";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("/register")
  register(
    @Body("name") name: string,
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    return this.userService.storeUser({ name, username, password });
  }

  @Post("/login")
  @HttpCode(200)
  async login(
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    const user = await this.authService.login(username, password);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
