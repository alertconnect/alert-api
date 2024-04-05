import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './schemas/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorsRepository: Repository<Sector>,
  ) {}
  private readonly logger = new Logger(SectorsService.name);

  /**
   * Find all sectors
   */
  findAll(): Promise<Sector[]> {
    return this.sectorsRepository.find({
      order: {
        code: 'ASC',
      },
    });
  }

  /**
   * Find one sector by code
   * @param {String} code
   */
  findOne(code: string): Promise<Sector> {
    return this.sectorsRepository.findOneBy({ code });
  }

  /**
   * Update sector by code
   * @param {String} code
   * @param data
   */
  async update(code: string, data: UpdateSectorDto): Promise<any> {
    return this.sectorsRepository.update(code, data);
  }

  /**
   * Upsert sector
   * @param data
   */
  async upsert(data: Sector): Promise<void> {
    await this.sectorsRepository.upsert([data], ['code']);
  }

  /**
   * Create a new sector
   * @param data
   */
  async create(data: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorsRepository.create(data);
    await this.sectorsRepository.save(data);
    return sector;
  }
}
