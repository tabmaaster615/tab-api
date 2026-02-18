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
import { UpdateUserDto } from './dto/updateUserDto.dto';

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
      password: hashedPassword,
    });
    const savedUser = await this.userRepo.save(newUser);

    // assign default role to newUser
    const defaultRole = await this.roleRepo.findOne({
      where: { name: 'USER' },
    });
    if (!defaultRole) throw new Error('Default USER role not seeded properly.');

    await this.userTournamentRoleRepo.save({
      user: savedUser,
      role: defaultRole,
    });

    return plainToInstance(ResponseUserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async assignRoleToUser(
    userId: string,
    roleId: string,
  ): Promise<ResponseUserDto> {
    const findUser = await this.userRepo.findOne({ where: { id: userId } });
    if (!findUser) throw new NotFoundException('User not found!');

    const findRole = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!findRole) throw new NotFoundException('Role not found!');

    const existingRole = await this.userTournamentRoleRepo.findOne({
      where: {
        user: { id: findUser.id },
        role: { id: findRole.id },
        // tournamentId: { id },
      },
    });
    if (existingRole) throw new BadRequestException('Role already assigned!');

    const setRole = this.userTournamentRoleRepo.create({
      user: findUser,
      role: findRole,
      // tournamentId: null,
    });

    await this.userTournamentRoleRepo.save(setRole);

    return plainToInstance(ResponseUserDto, findUser, {
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

  async updateUser(id: string, dto: UpdateUserDto): Promise<ResponseUserDto> {
    const findUser = await this.userRepo.findOne({ where: { id } });
    if (!findUser) throw new NotFoundException('User not found!');

    if (dto.email && dto.email !== findUser.email) {
      const existingEmail = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (existingEmail)
        throw new BadRequestException('This email is already used!');
      findUser.email = dto.email;
    }

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 12);
      findUser.password = hashedPassword;
    }

    if (dto.firstName) findUser.firstName = dto.firstName;
    if (dto.lastName) findUser.lastName = dto.lastName;
    if (dto.institution) findUser.institution = dto.institution;
    if (dto.phone) findUser.phone = dto.phone;

    const updatedUser = await this.userRepo.save(findUser);
    return plainToInstance(ResponseUserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const findUser = await this.userRepo.findOne({ where: { id } });
    if (!findUser) throw new NotFoundException('User not found!');

    await this.userRepo.remove(findUser);
    return { message: 'The user has been deleted successfully!' };
  }
}
