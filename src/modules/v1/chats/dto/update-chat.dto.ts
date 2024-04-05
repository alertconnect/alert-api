import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty({
    description: 'The last alerts code',
    example: 'DPC_BULLETIN_2022_08_18_69441',
  })
  last_alert_code: string;

  @ApiProperty({
    description: 'The last alerts date',
    example: '2022-08-18 10:00:00.000',
  })
  last_alert_date: Date;
}
