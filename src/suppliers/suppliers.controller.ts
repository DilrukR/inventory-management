import { Controller, Post, Body } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { createSupplierDto } from './dto/supplier.dto';
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('create-supplier')
  create(@Body() createSupplierDto: createSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }
}
