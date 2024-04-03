import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    description: 'Telegram group id',
    example: '345345345',
  })
  telegram_id: string;

  @ApiProperty({
    description: 'The title of the chats',
    example: 'Gruppo pubblico di esempio',
  })
  title: string;

  @ApiProperty({
    description: 'The type of the chats',
    example: 'group',
  })
  type: string;

  @ApiProperty({
    description: 'Sector code',
    example: 'Lomb-13',
  })
  code: string;

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
