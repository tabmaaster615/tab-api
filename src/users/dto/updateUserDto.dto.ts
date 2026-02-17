import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUserDto.dto';

// PartialType handles both class-validator (@IsOptional)
// and Swagger (@ApiProperty({ required: false })) automatically.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
