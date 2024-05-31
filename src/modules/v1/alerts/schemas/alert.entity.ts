import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['location_code', 'type'])
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'alertId' };

  @Column()
  type: string;

  @Column()
  event: string;

  @Column()
  urgency: string;

  @Column()
  severity: string;

  @Column()
  certainty: string;

  @Column()
  identifier: string;

  @Column()
  location_code: string;

  @Column()
  location_desc: string;

  @Column()
  onset: Date;

  @Column()
  expires: Date;

  @Column({ default: new Date() })
  received: Date;
}
