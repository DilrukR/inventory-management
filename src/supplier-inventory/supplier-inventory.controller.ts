import { Controller, Post, Body } from '@nestjs/common';
import { SupplierInventoryService } from './supplier-inventory.service';
import { SupplierInventoryDto } from './dto/createSpplierInventory.dto';

@Controller('supplier-inventory')
export class SupplierInventoryController {
  constructor(
    private readonly supplierInventoryService: SupplierInventoryService,
  ) {}

  @Post('create-supplier-inventory')
  create(@Body() createSupplierInventoryDto: SupplierInventoryDto) {
    return this.supplierInventoryService.create(createSupplierInventoryDto);
  }
}
