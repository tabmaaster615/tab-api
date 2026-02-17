import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class RoleResponseDto {
  @ApiProperty({
    description: 'ID of the role, this is a UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Name of the role',
    example: 'admin',
  })
  @Expose()
  name: string;
}
