import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto.dto';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUserDto } from './dto/AuthenticatedUserDto.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAuthDto } from './dto/responseAuthDto.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto): Promise<User> {
    const findUser = await this.userService.findUserForAuthByEmail(dto.email);
    if (!findUser) throw new UnauthorizedException('User not found!');

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      findUser.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials.');

    return findUser;
  }

  async login(user: User): Promise<ResponseAuthDto> {
    const permissions = this.userService.buildPermissions(user);

    const roles = user.tournamentRoles.map((tr) => tr.role.name);

    const payload = {
      email: user.email,
      sub: user.id,
      roles,
      permissions,
    };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN as unknown as number,
    });

    const userDto = plainToInstance(AuthenticatedUserDto, user, {
      excludeExtraneousValues: true,
    });

    return plainToInstance(ResponseAuthDto, {
      accessToken: access_token,
      refreshToken: refresh_token,
      user: userDto,
    });
  }
}
