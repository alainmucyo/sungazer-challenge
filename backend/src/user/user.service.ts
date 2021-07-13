import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async storeUser({ name, username, password }) {
    const user = new UserEntity();
    user.name = name;
    user.username = username;
    user.password = password;
    return await user.save();
  }

  async findUserByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
