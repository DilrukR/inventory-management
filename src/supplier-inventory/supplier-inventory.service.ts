import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierInventory } from 'src/db/Entities/supplierInventory.entity';
import { SupplierInventoryDto } from './dto/createSpplierInventory.dto';

@Injectable()
export class SupplierInventoryService {
  constructor(
    @InjectRepository(SupplierInventory)
    private supplierInventoryRepository: Repository<SupplierInventory>,
  ) {}

  async create(createSupplierInventoryDto: SupplierInventoryDto) {
    await this.supplierInventoryRepository.save(createSupplierInventoryDto);

    return {
      message: 'Supplier inventory created successfully',
    };
  }

  async findAll() {}
}
