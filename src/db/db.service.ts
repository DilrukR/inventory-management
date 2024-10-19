import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryUser } from './Entities/inventory.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class DbService {}
