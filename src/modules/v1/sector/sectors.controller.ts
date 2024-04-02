import {
  Controller,
  Get,
  Request,
  Logger,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { ApiBasicAuth, ApiBody, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CreateSectorDto } from './dto/create-sector.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Sectors')
@Controller()
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}
  private readonly logger = new Logger(SectorsController.name);

  @Get()
  async index(@Request() request) {
    this.logger.log(
      `Request all sectors with options: ${JSON.stringify(request.query)}`,
    );
    return await this.sectorsService.findAll();
  }

  @Get('/:code')
  async show(@Request() request) {
    this.logger.log(`Request sector with code: ${request.params.code}`);
    return await this.sectorsService.findOne(request.params.code);
  }

  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateSectorDto })
  @Post()
  async create(@Request() request) {
    this.logger.log(
      `Request to create sector: ${JSON.stringify(request.body)}`,
    );
    return await this.sectorsService.create(request.body);
  }
}
