import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsIn,
  MaxLength,
  Min,
  IsUrl,
} from 'class-validator';

export class UpdateInventoryUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  productName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  priority?: number;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'archived']) // Example statuses
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  category?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsDate()
  createdDate?: Date;

  @IsOptional()
  @IsDate()
  updatedDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  supplier?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['yes', 'no']) // Assuming "isUser" is a yes/no value
  isUser?: string;
}
