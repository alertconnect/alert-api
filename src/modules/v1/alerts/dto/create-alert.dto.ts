import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The bulletin that issued the alerts given by authority',
    example: 'DPC_BULLETIN_2022_08_18_69441',
  })
  identifier: string;

  @ApiProperty({
    description: 'The type of the alerts',
    example: 'storm',
    enum: ['storm', 'earthquake', 'flood', 'fire', 'hydro', 'other'],
  })
  type: string;

  @ApiProperty({
    description: 'Event text information',
    example: 'MODERATA CRITICITA PER RISCHIO TEMPORALI / ALLERTA ARANCIONE',
  })
  event: string;

  @ApiProperty({
    description: 'The urgency of the alerts',
    example: 'Expected',
    enum: ['Immediate', 'Expected', 'Future', 'Past', 'Unknown'],
  })
  urgency: string;

  @ApiProperty({
    description: 'The severity of the alerts',
    example: 'Severe',
    enum: ['Minor', 'Moderate', 'Severe', 'Extreme', 'Unknown'],
  })
  severity: string;

  @ApiProperty({
    description: 'The certainty of the alerts',
    example: 'Likely',
    enum: ['Observed', 'Likely', 'Possible', 'Unlikely', 'Unknown'],
  })
  certainty: string;

  @ApiProperty({
    description: 'The code of the alerts',
    example: 'Lomb-13',
  })
  location_code: string;

  @ApiProperty({
    description: 'The description of the location',
    example: 'Alta Valtellina',
  })
  location_desc: string;

  @ApiProperty({
    description: 'The starting date of the alerts',
    example: '2022-08-18 10:00:00.000',
  })
  onset: Date;

  @ApiProperty({
    description: 'The expiration date of the alerts',
    example: '2022-08-18 21:59:59.000',
  })
  expires: Date;

  @ApiProperty({
    description: 'The issued date of the alerts',
    example: '2022-08-18 13:47:00.000',
  })
  received: Date;
}
