import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { createSupplierDto } from './dto/supplier.dto';
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('create-supplier')
  create(@Body() createSupplierDto: createSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get('get-All-suppliers')
  getAll() {
    return this.suppliersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.suppliersService.getById(id);
  }

  @Patch('update-supplier/:id')
  update(
    @Param(':id') id: string,
    @Body() updateSupplierDto: createSupplierDto,
  ) {
    return this.suppliersService.update(id, updateSupplierDto);
  }
}
