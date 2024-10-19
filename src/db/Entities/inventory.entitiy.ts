import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('inventory_user')
export class InventoryUser {
  @PrimaryColumn()
  id: string;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  priority: number;

  @Column()
  status: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @Column()
  supplier: string;

  @Column()
  supplierId: number;

  @Column()
  isUser: string;

  constructor() {
    this.id = uuidv4();
  }
}
