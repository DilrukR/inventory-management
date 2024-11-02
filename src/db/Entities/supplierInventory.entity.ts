import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('supplier_inventory')
export class SupplierInventory {
  @PrimaryColumn()
  @Generated('uuid')
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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  constructor() {
    this.id = uuidv4();
  }
}
