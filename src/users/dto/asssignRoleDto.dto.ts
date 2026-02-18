import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({
    description: 'The ID of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the role',
    example: '7c9e66ab-965d-400e-8d00-441776516622',
  })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @ApiPropertyOptional({
    description: 'The ID of the tournament (optional for global roles)',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  })
  @IsOptional() // This allows the field to be missing or null
  @IsUUID('4', { message: 'tournamentId must be a valid UUID' })
  tournamentId?: string | null;
}
