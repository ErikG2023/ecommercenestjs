import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from '../../carts/entities/cart-item.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ordenes)
  usuario: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  estado: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.orden)
  items: CartItem[];

  @OneToOne(() => Payment, (payment) => payment.orden)
  pago: Payment;
}
