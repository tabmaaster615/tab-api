import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Institute of the user', example: 'Harvard University' })
  @IsString()
  @IsNotEmpty()
  institution: string;

  @ApiProperty({ description: 'Phone number in international format', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Unique email address', example: 'demo@email.com', format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'Secure password (min 8 characters)', 
    example: 'StrongP@ss123', 
    minLength: 8,
    format: 'password' // Hides value in some Swagger UI versions
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}