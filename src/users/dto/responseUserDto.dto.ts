import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RoleResponseDto } from './roleResponseDto.dto';

export class ResponseUserDto {
  @ApiProperty({
    description: 'ID of the user, this is a UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    description: 'Institute of the user',
    example: 'Harvard University',
  })
  @Expose()
  institute: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'jone.doe@mail.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
  })
  @Expose()
  @Type(() => RoleResponseDto)
  role: RoleResponseDto;

  @ApiProperty({
    description: 'The status of the user. Is the user active?',
    example: true,
  })
  @Expose()
  isActive: boolean;
}
