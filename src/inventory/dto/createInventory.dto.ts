export class CreateInventoryUserDto {
  productName: string;
  description: string;
  quantity: number;
  price: number;
  priority: number;
  status: string;
  category: string;
  image: string;
  createdDate: Date;
  updatedDate: Date;
  supplier: string;
  supplierId: string;
  isUser: string;
}
