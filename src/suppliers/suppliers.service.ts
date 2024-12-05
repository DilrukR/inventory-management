import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Supplier } from 'src/db/Entities/supplier.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createSupplierDto } from './dto/supplier.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: createSupplierDto) {
    const existingUser = await this.supplierRepository.findOne({
      where: [
        { email: createSupplierDto.email },
        { phone: createSupplierDto.phone },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or phone already exists',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createSupplierDto.password, salt);
    const user = this.supplierRepository.create({
      ...createSupplierDto,
      password: hashedPassword,
    });

    await this.supplierRepository.save(user);
    return { message: 'Supplier created successfully' };
  }

  async findbyEmail(email: string) {
    const supplier = await this.supplierRepository.findOne({
      where: { email },
    });
    return supplier;
  }

  async getAll() {
    const suppliers = await this.supplierRepository.find();
    return { data: suppliers };
  }

  async getById(id: string) {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return {
      message: `Supplier with ID ${id} found`,
      data: supplier,
    };
  }

  async update(id: string, updateSupplierDto: createSupplierDto) {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    const updatedSupplier = Object.assign(supplier, updateSupplierDto);
    const savedSupplier = await this.supplierRepository.save(updatedSupplier);

    return {
      message: `Supplier item '${savedSupplier.firstName}' has been updated`,
      data: savedSupplier,
    };
  }
}
