import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SupplierInventoryModule } from './supplier-inventory/supplier-inventory.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, InventoryModule, DbModule, UsersModule, OrdersModule, SuppliersModule, SupplierInventoryModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
