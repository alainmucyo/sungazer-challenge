import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/user.entity";
import { IsNotEmpty } from "class-validator";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({
    enum: TransactionType,
    type: "enum",
    default: TransactionType.DEPOSIT,
  })
  type: TransactionType;

  @IsNotEmpty()
  @Column()
  amount: number;

  @IsNotEmpty()
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
