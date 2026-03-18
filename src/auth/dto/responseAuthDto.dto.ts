import { ApiProperty } from '@nestjs/swagger';
import { AuthenticatedUserDto } from './AuthenticatedUserDto.dto';

export class ResponseAuthDto {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    type: AuthenticatedUserDto,
    description: 'The authenticated user details',
  })
  user: AuthenticatedUserDto;
}
