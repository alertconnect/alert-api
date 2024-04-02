import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { SectorsConsumer } from './sectors.consumer';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sectors',
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  controllers: [SectorsController],
  providers: [SectorsService, SectorsConsumer, PrismaService],
})
export class SectorsModule {}
