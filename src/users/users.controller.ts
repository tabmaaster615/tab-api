import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/responseUserDto.dto';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { AssignRoleDto } from './dto/asssignRoleDto.dto';
import { User } from './entities/user.entity';

@ApiTags('Users') // Capitalized for better UI presentation
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a unique user profile in the system.',
  })
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: 'User successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or email already exists.',
  })
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.usersService.createUser(dto);
  }

  @Post('assign-role')
  @ApiOperation({
    summary: 'Assign a role to a user',
    description: 'Assigns a role to a user.',
  })
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: 'Role assigned successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or role not found.',
  })
  async assignRoleToUser(@Body() dto: AssignRoleDto): Promise<ResponseUserDto> {
    return await this.usersService.assignRoleToUser(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns a list of all registered users.',
  })
  @ApiOkResponse({
    type: [ResponseUserDto],
    description: 'List of users retrieved successfully.',
  })
  async findAllUser(): Promise<ResponseUserDto[]> {
    return await this.usersService.findAllUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique UUID of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOneUser(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.usersService.findOneUser(id);
  }

  @Get('user-permissions/:id')
  @ApiOperation({ summary: 'Get user with roles and permissions' })
  @ApiParam({
    name: 'id',
    description: 'The unique UUID of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findUserWithRolesAndPermissions(
    @Param('id') id: string,
  ): Promise<User> {
    return await this.usersService.findUserWithRolesAndPermissions(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiParam({
    name: 'email',
    description: 'Registered email address',
    example: 'john.doe@example.com',
  })
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'No user found with this email.' })
  async findByEmail(@Param('email') email: string): Promise<ResponseUserDto> {
    return await this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'id', description: 'The unique ID of the user to update' })
  @ApiOkResponse({
    type: ResponseUserDto,
    description: 'User updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return await this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The unique ID of the user to remove' })
  @ApiOkResponse({
    description: 'User deleted successfully.',
    schema: { example: { message: 'User deleted' } },
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return await this.usersService.deleteUser(id);
  }
}
