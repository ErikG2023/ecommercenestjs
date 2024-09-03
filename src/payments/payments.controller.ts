import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(req.user, createPaymentDto);
  }

  @Put(':id/status')
  updatePaymentStatus(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentsService.updatePaymentStatus(
      +id,
      updatePaymentStatusDto.status,
    );
  }
}
