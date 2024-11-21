import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/Entities/user.entitiy';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: createUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone already exists',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return { message: 'User created successfully' };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
      const phoneExists = await this.userRepository.findOne({
        where: { phone: updateUserDto.phone },
      });
      if (phoneExists) {
        throw new ConflictException('Phone already in use');
      }
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    await this.userRepository.update(id, updateUserDto);
    return { message: 'User updated successfully' };
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
