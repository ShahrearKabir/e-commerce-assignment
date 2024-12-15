import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column('json')
  products: { productId: string; quantity: number }[];

  @Column('decimal')
  totalPrice: number;

  @Column({ default: 'Pending', enum:['Pending', 'Shipped', 'Delivered', 'Cancelled'] })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}