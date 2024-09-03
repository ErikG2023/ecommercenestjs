import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: string[];

  @OneToMany(() => Cart, (cart) => cart.usuario)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.usuario)
  ordenes: Order[];
}
