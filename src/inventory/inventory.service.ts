import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';
import { Repository } from 'typeorm';
import { CreateInventoryUserDto } from './dto/createInventory.dto';
import { UpdateInventoryUserDto } from './dto/updateInventory.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryUser)
    private inventoryRepository: Repository<InventoryUser>,
  ) {}

  /**
   * Create a new inventory item.
   */
  async create(createInventoryUserDto: CreateInventoryUserDto): Promise<any> {
    const existingProduct = await this.inventoryRepository.findOne({
      where: { productName: createInventoryUserDto.productName },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this name already exists');
    }

    const newProduct = this.inventoryRepository.create(createInventoryUserDto);
    await this.inventoryRepository.save(newProduct);

    return {
      message: `Product '${createInventoryUserDto.productName}' has been created`,
    };
  }

  /**
   * Find all inventory items with pagination.
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: InventoryUser[]; total: number; page: number }> {
    const [data, total] = await this.inventoryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { productName: 'ASC' }, // Example: Sort by product name
    });

    return {
      data,
      total,
      page,
    };
  }

  /**
   * Get an inventory item by ID.
   */
  async getById(id: string): Promise<any> {
    const inventoryItem = await this.inventoryRepository.findOne({
      where: { id },
    });

    if (!inventoryItem) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return {
      message: `Inventory with ID ${id} found`,
      data: inventoryItem,
    };
  }

  /**
   * Update an inventory item by ID.
   */
  async update(
    id: string,
    updateInventoryUserDto: UpdateInventoryUserDto,
  ): Promise<{ message: string; data: InventoryUser }> {
    const inventoryItem = await this.inventoryRepository.findOne({
      where: { id },
    });

    if (!inventoryItem) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    const updatedItem = Object.assign(inventoryItem, updateInventoryUserDto);
    const savedItem = await this.inventoryRepository.save(updatedItem);

    if (savedItem.quantity < 5) {
      const notificationService = new NotificationsService();
      await notificationService.sendPushNotification(
        `drZ9hwa-Szi59hjSWkZH_k:APA91bEwAeL5sQfBnENlkcjp5xqahZXqpvwW9fJqpbrvacsV10y56o7vM3fdxIMFhl_37cPqjkZC1Fjmj4DiScSnleOAsb2u3P7WrizLMSHuQkMVaQvAPGA`,
        'Low Stock Alert',
        `Product '${savedItem.productName}' is running low in stock`,
      );
    }

    return {
      message: `Inventory item '${savedItem.productName}' has been updated`,
      data: savedItem,
    };
  }

  /**
   * Remove an inventory item by ID.
   */
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

  /**
   * Search inventory items by query.
   */
  async search(query: string): Promise<InventoryUser[]> {
    if (!query.trim()) {
      throw new BadRequestException('Search query cannot be empty');
    }

    return this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.productName ILIKE :query', { query: `%${query}%` })
      .orWhere('inventory.description ILIKE :query', { query: `%${query}%` }) // Example: Search in description
      .getMany();
  }

  /**
   * Get inventory statistics.
   */
  async getInventoryStatistics(): Promise<{
    totalItemCount: number;
    totalQuantity: number;
    totalValue: number;
    lowStockItems: InventoryUser[];
  }> {
    const items = await this.inventoryRepository.find();

    const totalItemCount = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    const lowStockItems = items.filter((item) => item.quantity < 5);

    return {
      totalItemCount,
      totalQuantity,
      totalValue,
      lowStockItems,
    };
  }
}
