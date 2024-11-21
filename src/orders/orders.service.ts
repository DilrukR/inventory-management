import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from 'src/db/Entities/orders.entitiy';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/db/Entities/user.entitiy';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(InventoryUser)
    private inventoryRepository: Repository<InventoryUser>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Orders; message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.user_Id },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createOrderDto.user_Id} not found`,
      );
    }

    const product = await this.inventoryRepository.findOne({
      where: { id: createOrderDto.product_Id },
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createOrderDto.product_Id} not found`,
      );
    }

    const order = this.ordersRepository.create({
      ...createOrderDto,
      user,
      product,
    });
    await this.ordersRepository.save(order);

    return {
      message: 'Order created successfully',
      order,
    };
  }


  async getAllOrders(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Orders[];
    total: number;
    page: number;
    message: string;
  }> {
    const [data, total] = await this.ordersRepository.findAndCount({
      relations: ['user', 'product'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'Orders fetched successfully',
      data,
      total,
      page,
    };
  }
}
