import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
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

  @Column({ unique: true })
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
