import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ALERT_QUEUE_NAME } from '../../../constants';

@Injectable()
export class AlertsProducerService {
  constructor(@InjectQueue(ALERT_QUEUE_NAME) private queue: Queue) {}

  async sendMessage(message: object) {
    await this.queue.add(ALERT_QUEUE_NAME, message);
  }
}
