import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { AuthGuard } from "@nestjs/passport";
import { TransactionType } from "./entities/transaction.entity";

@Controller("api/transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const user = req.user;
    if (
      createTransactionDto.type == TransactionType.WITHDRAW &&
      user.balance < createTransactionDto.amount
    )
      throw new UnprocessableEntityException("Not enough balance");
    return this.transactionService.create(createTransactionDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll(@Request() req) {
    return this.transactionService.findByUser(req.user.id);
  }
}
