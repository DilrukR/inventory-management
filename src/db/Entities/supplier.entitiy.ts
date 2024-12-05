import { IsEmail, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity('suppliers')
export class Supplier {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  deviceToken: string;

  constructor() {
    this.id = uuidv4();
  }
}
