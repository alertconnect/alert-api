import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorDto } from './dto/sector.dto';

@Processor('sectors')
export class SectorsConsumer {
  constructor(private readonly sectorService: SectorsService) {}

  private readonly logger = new Logger(SectorsConsumer.name);

  /**
   * Process incoming job to create or update sector
   * @param job
   */
  @Process()
  async createNewSectors(job: Job<SectorDto>) {
    const { data } = job;
    this.logger.log(`Incoming on sectors queue: ${JSON.stringify(data)}`);
    // Create or update sector
    await this.sectorService.upsert(data);
  }

  /**
   * Log when job is completed
   * @param job
   */
  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.debug(`Processing sector job completed: ${job.returnvalue}`);
  }

  /**
   * Log when job fails
   * @param job
   * @param error
   */
  @OnQueueError()
  onError(job: Job, error: Error) {
    this.logger.error(`Processing sector job failed: ${error.message}`);
  }
}
