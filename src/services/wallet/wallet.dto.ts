import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsUUID,
} from "class-validator";

export class WalletTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  transactionType: "deposit" | "withdrawal" | "reward" | "purchase";

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  txHash?: string;
}

export class WalletBalanceDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  balance: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pendingBalance?: number;
}
