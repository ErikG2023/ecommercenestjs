import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, (order) => order.pago)
  @JoinColumn()
  orden: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo: string;

  @Column()
  estado: string;
}
