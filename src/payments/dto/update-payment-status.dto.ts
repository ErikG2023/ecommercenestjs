import { IsString, IsEnum } from 'class-validator';

export class UpdatePaymentStatusDto {
  @IsString()
  @IsEnum(['pending', 'completed', 'failed'])
  status: string;
}
