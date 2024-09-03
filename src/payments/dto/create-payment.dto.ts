import { IsNumber, IsString, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  orderId: number;

  @IsString()
  @IsEnum(['credit_card', 'paypal', 'bank_transfer'])
  method: string;
}
