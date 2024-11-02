import { Module } from '@nestjs/common';
import { SupplierInventoryController } from './supplier-inventory.controller';
import { SupplierInventoryService } from './supplier-inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierInventory } from 'src/db/Entities/supplierInventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierInventory])],
  controllers: [SupplierInventoryController],
  providers: [SupplierInventoryService],
  exports: [SupplierInventoryService],
})
export class SupplierInventoryModule {}
