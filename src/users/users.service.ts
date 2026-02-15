import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserTournamentRole } from './entities/userTournamentRole.entity';
import { ResponseUserDto } from './dto/responseUserDto.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(UserTournamentRole)
    private readonly userTournamentRoleRepo: Repository<UserTournamentRole>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existingUser)
      throw new BadRequestException('This email is already used!');

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const newUser = this.userRepo.create({
      ...dto,
      passwordHash: hashedPassword,
    });

    const savedUser = await this.userRepo.save(newUser);
    return plainToInstance(ResponseUserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAllUser(): Promise<ResponseUserDto[]> {
    const allUsers = await this.userRepo.find();
    if (allUsers.length === 0) throw new BadRequestException('No users found!');

    return allUsers.map((user) =>
      plainToInstance(ResponseUserDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOneUser(id: string): Promise<ResponseUserDto> {
    const findUser = await this.userRepo.findOne({ where: { id } });
    if (!findUser) throw new NotFoundException('User not found!');

    return plainToInstance(ResponseUserDto, findUser, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<ResponseUserDto> {
    const findUser = await this.userRepo.findOne({ where: { email } });
    if (!findUser) throw new NotFoundException('User not found!');

    return plainToInstance(ResponseUserDto, findUser, {
      excludeExtraneousValues: true,
    });
  }
}
