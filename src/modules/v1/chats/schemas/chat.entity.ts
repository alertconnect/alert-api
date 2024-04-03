import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity()
export class Chat extends BaseEntity {
  @Index(['telegram_id', 'code'], { unique: true })
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'chatId' };

  @Column()
  telegram_id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column()
  last_alert_code: string;

  @Column()
  last_alert_date: Date;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
