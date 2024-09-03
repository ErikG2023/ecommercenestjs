import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { User } from '../users/entities/user.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
    private productsService: ProductsService,
  ) {}

  async getCart(user: User): Promise<Cart> {
    let cart = await this.cartsRepository.findOne({
      where: { usuario: { id: user.id } },
      relations: ['items', 'items.producto'],
    });

    if (!cart) {
      cart = this.cartsRepository.create({ usuario: user });
      await this.cartsRepository.save(cart);
    }

    return cart;
  }

  async addItem(
    user: User,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.getCart(user);
    const product = await this.productsService.findOne(productId);

    let item = cart.items.find((item) => item.producto.id === product.id);

    if (item) {
      item.cantidad += quantity;
      await this.cartItemsRepository.save(item);
    } else {
      item = this.cartItemsRepository.create({
        carrito: cart,
        producto: product,
        cantidad: quantity,
      });
      cart.items.push(item);
      await this.cartItemsRepository.save(item);
    }

    return this.getCart(user);
  }

  async removeItem(user: User, productId: number): Promise<Cart> {
    const cart = await this.getCart(user);
    cart.items = cart.items.filter((item) => item.producto.id !== productId);
    await this.cartsRepository.save(cart);
    return this.getCart(user);
  }

  async clearCart(user: User): Promise<void> {
    const cart = await this.getCart(user);
    cart.items = [];
    await this.cartsRepository.save(cart);
  }
}
