import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @ApiProperty({
    description: 'UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'Harvard University' })
  @Expose()
  institution: string; // Fixed name to match CreateUserDto

  @ApiProperty({ example: '+1234567890' })
  @Expose()
  phone: string;

  @ApiProperty({ example: 'john.doe@mail.com' })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User permission level',
    example: 'DEBATER',
  })
  @Expose()
  role: {
    name: string;
    tournamentId: string | null;
  };

  @ApiProperty({ description: 'Account status', example: true })
  @Expose()
  isActive: boolean;
}
