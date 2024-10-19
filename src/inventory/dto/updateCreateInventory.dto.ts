import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryUserDto } from './createInventory.dto';

export class UpdateInventoryUserDto extends PartialType(
  CreateInventoryUserDto,
) {}
