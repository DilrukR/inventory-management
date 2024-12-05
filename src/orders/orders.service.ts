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

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { order_Id: id },
      relations: ['user', 'product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getOrderByUserId(userId: number): Promise<Orders[]> {
    const orders = await this.ordersRepository.find({
      where: { user_Id: userId },
      relations: ['user', 'product'],
    });
    return orders;
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    const order = await this.ordersRepository.findOne({
      where: { order_Id: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.ordersRepository.delete(id);
    return {
      message: 'Order deleted successfully',
    };
  }

  async updateOrder(
    id: string,
    updateOrderDto: CreateOrderDto,
  ): Promise<{ message: string }> {
    const order = await this.ordersRepository.findOne({
      where: { order_Id: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    await this.ordersRepository.update(id, updateOrderDto);
    return {
      message: 'Order updated successfully',
    };
  }

  getOrderBySupplierId(supplierId: string): Promise<Orders[]> {
    return this.ordersRepository.find({
      where: {
        product: {
          supplierId: supplierId, // Filter by supplierId in the related product entity
        },
      },
      relations: ['user', 'product'], // Include relations to 'user' and 'product'
    });
  }

  async getorderbystatus(status: string, userId: number): Promise<Orders[]> {
    const orders = await this.ordersRepository.find({
      where: {
        status: status,
        user_Id: userId,
      },
      relations: ['user', 'product'],
    });
    return orders;
  }
}
