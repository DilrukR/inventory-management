import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryUser]),
    NotificationsModule,
    SuppliersModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService, TypeOrmModule],
})
export class InventoryModule {}
