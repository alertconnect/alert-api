import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './schemas/alert.entity';
import { ApiBasicAuth, ApiBody, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertsProducerService } from './alerts.producer.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Alerts')
@Controller()
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly alertsProducerService: AlertsProducerService,
  ) {}
  private readonly logger = new Logger(AlertsController.name);

  /**
   * Get all alerts
   * @param request
   */
  @Get()
  async index(@Request() request): Promise<Alert[]> {
    this.logger.log(
      `Request all alerts with options: ${JSON.stringify(request.query)}`,
    );
    return await this.alertsService.findAll();
  }

  /**
   * Get alert by location
   * @param request
   */
  @Get('/:location')
  async findByLocation(@Request() request): Promise<Alert[]> {
    this.logger.log(`Request alerts for location ${request.params.location}`);
    const alert = await this.alertsService.findByLocation(
      request.params.location,
    );
    if (alert.length === 0) {
      return [];
    }
    return alert;
  }

  /**
   * Get alert by location and type
   * @param request
   */
  @Get('/:location/:type')
  async findByLocationAndType(@Request() request): Promise<Alert> {
    this.logger.log(
      `Request alerts for location ${request.params.location} and type ${request.params.type}`,
    );
    const alert = await this.alertsService.findByLocationAndType(
      request.params.location,
      request.params.type,
    );
    if (!alert) {
      return new Alert();
    }
    return alert;
  }

  /**
   * Create a new alert
   * @param request
   */
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @ApiBody({ type: CreateAlertDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/enqueue')
  async create(@Request() request): Promise<Alert> {
    const alert = request.body;
    this.logger.log(`Request to create alert: ${JSON.stringify(request.body)}`);
    await this.alertsProducerService.sendMessage(request.body);
    return alert;
  }

  /**
   * Delete alert by id
   * @param request
   */
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Request() request): Promise<Alert> {
    this.logger.log(`Request to delete alert: ${request.params.id}`);
    return await this.alertsService.delete(request.params.id);
  }
}
