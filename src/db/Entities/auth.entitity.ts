import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;
}
