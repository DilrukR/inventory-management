import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  UseGuards,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryUserDto } from './dto/createInventory.dto';
import { JwtAuthGuard } from 'src/auth/JwT/jwt-auth.guard';
import { InventoryUser } from 'src/db/Entities/inventory.entitiy';
import { UpdateInventoryUserDto } from './dto/updateInventory.dto';

@Controller('user-inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-inventory')
  create(@Body() createInventoryUserDto: CreateInventoryUserDto) {
    return this.inventoryService.create(createInventoryUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-inventory')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.inventoryService.findAll(page, limit);
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<InventoryUser[]> {
    return this.inventoryService.search(query);
  }

  @Get('get-inventory-by-id')
  async getById(@Query('id') id: string): Promise<InventoryUser> {
    return this.inventoryService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics')
  async getInventoryStatistics() {
    return this.inventoryService.getInventoryStatistics();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryUserDto: UpdateInventoryUserDto,
  ) {
    return this.inventoryService.update(id, updateInventoryUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.inventoryService.remove(id);
  }
}
