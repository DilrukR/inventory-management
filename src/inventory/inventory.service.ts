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

  async getInventoryStatistics(): Promise<{
    totalItemCount: number;
    totalQuantity: number;
    totalValue: number;
    lowStockItems: InventoryUser[];
  }> {
    // Get total item count and total quantity and value
    const items = await this.inventoryRepository.find();
    const totalItemCount = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    // Find items with quantity less than 5
    const lowStockItems = items.filter((item) => item.quantity < 5);

    return {
      totalItemCount,
      totalQuantity,
      totalValue,
      lowStockItems,
    };
  }
}
