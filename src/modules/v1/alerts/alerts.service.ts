import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Alert } from './schemas/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  /**
   * Find all alerts
   */
  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  /**
   * Create alert
   * @param data
   */
  async create(data: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepository.create(data);
    await this.alertRepository.save(data);
    return alert;
  }

  /**
   * Find alert by location
   * @param {String} location
   */
  findByLocation(location: string): Promise<Alert[]> {
    return this.alertRepository.find({
      where: {
        location_code: location,
      },
    });
  }

  /**
   * Find alert by location, identifier and type
   * @param {String} location
   * @param {String} identifier
   * @param {String} type
   */
  findByLocationIdentifierAndType(
    location: string,
    identifier: string,
    type: string,
  ): Promise<Alert | null> {
    return this.alertRepository.findOne({
      where: {
        location_code: location,
        identifier: identifier,
        type: type,
      },
    });
  }

  /**
   * Find alert by location and type
   * @param {String} location
   * @param {String} type
   */
  findByLocationAndType(location: string, type: string): Promise<Alert | null> {
    return this.alertRepository.findOne({
      where: {
        location_code: location,
        type: type,
      },
    });
  }

  /**
   * Update alert by id
   * @param {String} id
   * @param {UpdateAlertDto} data
   */
  update(id: string, data: UpdateAlertDto): Promise<any> {
    return this.alertRepository.update(id, data);
  }

  /**
   * Delete alert by id
   * @param {String} id
   */
  delete(id: string): Promise<any> {
    return this.alertRepository.delete(id);
  }

  /**
   * Remove all expired alerts every hour
   */
  @Cron(CronExpression.EVERY_HOUR)
  async removeExpiredAlerts() {
    this.logger.log('Removing all expired alerts');
    const currentDate = new Date();
    const deletedAlerts = await this.alertRepository.delete({
      expires: LessThanOrEqual(currentDate),
    });
    this.logger.log(`Deleted ${deletedAlerts.affected} expired alerts`);
  }
}
