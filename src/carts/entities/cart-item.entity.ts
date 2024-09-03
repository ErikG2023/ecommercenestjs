import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from './cart.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  producto: Product;

  @ManyToOne(() => Cart, (cart) => cart.items)
  carrito: Cart;

  @ManyToOne(() => Order, (order) => order.items)
  orden: Order;

  @Column()
  cantidad: number;
}
