import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create-user')
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
