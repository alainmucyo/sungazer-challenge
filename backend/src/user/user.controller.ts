import { UserService } from "./user.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.findUserByUsername(
      registerDto.username,
    );
    if (user != null)
      throw new BadRequestException(["Username have been already used"]);
    return this.userService.storeUser({
      name: registerDto.name,
      username: registerDto.username,
      password: registerDto.password,
    });
  }

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/check")
  checkLogin(@Request() req) {
    return req.user;
  }
}
