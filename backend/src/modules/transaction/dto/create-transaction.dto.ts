import { TransactionType } from "../entities/transaction.entity";

export class CreateTransactionDto {
  type: TransactionType;
  amount: number;
}
