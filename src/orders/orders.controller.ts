import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('user-orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('place-order')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('all-orders')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('get-order-by-id/:id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Get('get-order-by-user-id/:userId')
  getOrderByUserId(@Param('userId') userId: number) {
    return this.ordersService.getOrderByUserId(userId);
  }

  @Delete('delete-order/:id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Post('update-order/:id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Get('get-order-by-status/:status/:userId')
  getOrderByStatus(
    @Param('status') status: string,
    @Param('userId') userId: number,
  ) {
    return this.ordersService.getorderbystatus(status, userId);
  }

  @Get('get-order-by-supplier-id/:supplierId')
  getOrderBySupplierId(@Param('supplierId') supplierId: string) {
    return this.ordersService.getOrderBySupplierId(supplierId);
  }
}
