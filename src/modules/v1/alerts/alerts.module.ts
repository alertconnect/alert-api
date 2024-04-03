import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './schemas/alert.entity';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertsConsumer } from './alerts.consumer';
import { AlertsProducerService } from './alerts.producer.service';
import { BullModule } from '@nestjs/bull';
import { ALERT_QUEUE_NAME } from '../../../constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: ALERT_QUEUE_NAME,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    TypeOrmModule.forFeature([Alert]),
  ],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsConsumer, AlertsProducerService],
})
export class AlertsModule {}
