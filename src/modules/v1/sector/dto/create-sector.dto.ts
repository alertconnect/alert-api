import { ApiProperty } from '@nestjs/swagger';

export class CreateSectorDto {
  @ApiProperty({
    description: 'The code of the alerts',
    example: 'Lomb-13',
  })
  code: string;

  @ApiProperty({
    description: 'The location description of the alerts',
    example: 'Bassa pianura centro-occidentale',
  })
  description: string;
}
