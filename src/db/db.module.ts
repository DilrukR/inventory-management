import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'inventory-management',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
