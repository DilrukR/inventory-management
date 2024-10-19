export class CreateOrderDto {
  order_Id: string;
  user_Id: number;
  product_Id: string;
  quantity: number;
  price: string;
  status: string;
  createdDate: Date;
  updatedDate: Date;
}
