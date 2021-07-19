import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction, TransactionType } from "./entities/transaction.entity";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class TransactionService {
  constructor(private readonly userService: UserService) {}

  async create(createTransactionDto: CreateTransactionDto, user: User) {
    //Getting user transaction
    const transaction = new Transaction();
    transaction.type = createTransactionDto.type;
    transaction.amount = createTransactionDto.amount;
    transaction.description = createTransactionDto.description;
    transaction.user = user;

    // Computing new balance
    let balance;
    if (transaction.type == TransactionType.WITHDRAW)
      balance = user.balance - transaction.amount;
    else balance = user.balance + transaction.amount;

    //Saving new balance
    await transaction.save();

    //Updating user balance;
    user.balance = await this.userService.updateBalance(user, balance);
    return transaction;
  }

  async findByUser(userId: number) {
    return await Transaction.find({ where: { user: userId } });
  }
}
