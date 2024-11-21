import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { JwtAuthGuard } from 'src/auth/JwT/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create-user')
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('find-user-by-id/:id')
  findUserById(@Param('id') id: number) {
    console.log(id);
    return this.usersService.findUserById(id);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('User ID:', id);
    console.log('Update Payload:', updateUserDto);
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
