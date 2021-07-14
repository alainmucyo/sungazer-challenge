import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async storeUser({ name, username, password }) {
    const user = new User();
    user.name = name;
    user.username = username;
    user.password = password;
    return await user.save();
  }

  async findUserByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
  findById(id: number) {
    return this.userRepo.findOne(id);
  }
  async updateBalance(user: User, balance: number) {
    user.balance = balance;
    await user.save();
    return balance;
  }
}
