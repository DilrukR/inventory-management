import { Injectable } from '@nestjs/common';
import { Supplier } from 'src/db/Entities/supplier.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserDto } from 'src/users/dto/user.dto';
import { createSupplierDto } from './dto/supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: createSupplierDto) {
    const supplier = this.supplierRepository.create(createSupplierDto);
    await this.supplierRepository.save(supplier);
    return { message: 'Supplier created successfully' };
  }
}
