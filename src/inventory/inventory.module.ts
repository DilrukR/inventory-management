import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryUser])],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService, TypeOrmModule],
})
export class InventoryModule {}
