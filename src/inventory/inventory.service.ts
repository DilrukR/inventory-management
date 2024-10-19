import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';
import { Repository } from 'typeorm';
import { CreateInventoryUserDto } from './dto/createInventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryUser)
    private inventoryRepository: Repository<InventoryUser>,
  ) {}

  async create(createInventoryUserDto: CreateInventoryUserDto): Promise<any> {
    const existingProduct = await this.inventoryRepository.findOne({
      where: { productName: createInventoryUserDto.productName },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this name already exists');
    }

    await this.inventoryRepository.save(
      this.inventoryRepository.create(createInventoryUserDto),
    );

    return {
      message: `Product '${createInventoryUserDto.productName}' has been created`,
    };
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: InventoryUser[]; total: number; page: number }> {
    const [data, total] = await this.inventoryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const inventoryItem = await this.inventoryRepository.findOne({
      where: { id },
    });

    if (!inventoryItem) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    await this.inventoryRepository.delete(id);

    return {
      message: `Inventory item '${inventoryItem.productName}' has been deleted`,
    };
  }

  async getById(id: string): Promise<any> {
    if (!id) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    const inventoryItem = await this.inventoryRepository.findOne({
      where: { id },
    });
    return {
      message: `Inventory with ID ${id} found`,
      data: inventoryItem,
    };
  }

  async search(query: string): Promise<InventoryUser[]> {
    if (!query) {
      return [];
    }
    return this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.productName ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
