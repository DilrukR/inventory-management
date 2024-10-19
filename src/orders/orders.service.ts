import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from 'src/db/Entities/orders.entitiy';
import { CreateOrderDto } from './dto/createOrder.dto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Orders> {
    const order = this.ordersRepository.create(createOrderDto);
    return await this.ordersRepository.save(order);
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
      data,
      total,
      page,
      message: 'Orders fetched successfully',
    };
  }
}
