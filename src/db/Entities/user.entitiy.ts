import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  deviceToken: string;
}
