import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/db/Entities/orders.entitiy';
import { UsersModule } from 'src/users/users.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), UsersModule, InventoryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
