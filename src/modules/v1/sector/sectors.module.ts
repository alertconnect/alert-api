import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { Sector } from './schemas/sector.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SectorsConsumer } from './sectors.consumer';
import { BullModule } from '@nestjs/bull';
import { SECTOR_QUEUE_NAME } from '../../../constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: SECTOR_QUEUE_NAME,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    TypeOrmModule.forFeature([Sector]),
  ],
  controllers: [SectorsController],
  providers: [SectorsService, SectorsConsumer],
})
export class SectorsModule {}
