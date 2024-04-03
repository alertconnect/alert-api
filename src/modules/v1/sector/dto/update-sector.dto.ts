import { ApiProperty } from '@nestjs/swagger';

export class UpdateSectorDto {
  @ApiProperty({
    description: 'The location description of the alerts',
    example: 'Bassa pianura centro-occidentale',
  })
  description: string;
}
