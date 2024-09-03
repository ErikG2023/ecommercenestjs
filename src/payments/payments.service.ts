import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { OrdersService } from '../orders/orders.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private ordersService: OrdersService,
  ) {}

  async createPayment(
    user: User,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const order = await this.ordersService.findOne(createPaymentDto.orderId);
    if (order.usuario.id !== user.id) {
      throw new NotFoundException('Order not found for this user');
    }

    const totalAmount = order.items.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0,
    );

    const payment = this.paymentsRepository.create({
      orden: order,
      monto: totalAmount,
      metodo: createPaymentDto.method,
      estado: 'pendiente',
    });

    return this.paymentsRepository.save(payment);
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['orden'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.estado = status;
    return this.paymentsRepository.save(payment);
  }
}
