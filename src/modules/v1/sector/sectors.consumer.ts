import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { Sector } from './schemas/sector.entity';
import { SECTOR_QUEUE_NAME } from '../../../constants';

@Processor(SECTOR_QUEUE_NAME)
export class SectorsConsumer {
  constructor(private readonly sectorService: SectorsService) {}

  private readonly logger = new Logger(SectorsConsumer.name);

  /**
   * Process incoming job to create or update sector
   * @param job
   */
  @Process()
  async createNewSectors(job: Job<Sector>) {
    const { data } = job;
    this.logger.log(`Incoming on sectors queue: ${JSON.stringify(data)}`);
    // Create or update sector
    const sector = await this.sectorService.findOne(data.code);
    if (sector) {
      this.logger.debug(
        `Sector already exists with code ${sector.code}, updating with new data`,
      );
      await this.sectorService.update(data.code, {
        description: data.description,
      });
      return;
    }
    this.logger.log(`Creating a new sector with code ${data.code}`);
    await this.sectorService.create(data);
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
