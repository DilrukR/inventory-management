import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entitiy'; // Ensure correct file naming
import { InventoryUser } from './inventory.entitiy';

@Entity('orders')
export class Orders {
  @PrimaryColumn()
  order_Id: string;

  @Column({ name: 'user_Id' })
  user_Id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_Id' })
  user: User;

  @Column({ name: 'product_Id' })
  product_Id: string;

  @ManyToOne(() => InventoryUser, (inventoryUser) => inventoryUser.id)
  @JoinColumn({ name: 'product_Id' })
  product: InventoryUser;

  @Column()
  quantity: number;

  @Column()
  price: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  constructor() {
    this.order_Id = uuidv4();
  }
}
