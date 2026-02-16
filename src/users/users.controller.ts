import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/responseUserDto.dto';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdateUserDto } from './dto/updateUserDto.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.usersService.createUser(dto);
  }

  @Get()
  async findAllUser(): Promise<ResponseUserDto[]> {
    return await this.usersService.findAllUser();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.usersService.findOneUser(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<ResponseUserDto> {
    return await this.usersService.findByEmail(email);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return await this.usersService.deleteUser(id);
  }
}
