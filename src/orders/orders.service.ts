import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async createOrder(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const order = this.orderRepository.create({
      usuario: user,
      fecha: new Date(),
      estado: 'pending',
    });

    await this.orderRepository.save(order);

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.nombre}`);
      }

      const orderItem = this.orderItemRepository.create({
        order: order,
        product: product,
        quantity: item.quantity,
      });

      await this.orderItemRepository.save(orderItem);

      // Actualizar el stock del producto
      await this.productsService.decreaseStock(product.id, item.quantity);
    }

    return this.findOne(order.id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getUserOrders(user: User): Promise<Order[]> {
    return this.orderRepository.find({
      where: { usuario: { id: user.id } },
      relations: ['items', 'items.product'],
    });
  }
}
