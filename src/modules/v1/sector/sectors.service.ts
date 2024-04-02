import { Injectable, Logger } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { PrismaService } from '../../../prisma.service';
import { SectorDto } from './dto/sector.dto';

@Injectable()
export class SectorsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(SectorsService.name);

  /**
   * Find all sectors
   */
  findAll() {
    return this.prisma.sector.findMany({});
  }

  /**
   * Find one sector by code
   * @param {String} code
   */
  findOne(code: string) {
    return this.prisma.sector.findUnique({
      where: { code },
    });
  }

  /**
   * Update sector by code
   * @param {String} code
   * @param data
   */
  async update(code: string, data: UpdateSectorDto) {
    return this.prisma.sector.update({
      where: { code },
      data,
    });
  }

  /**
   * Upsert sector
   * @param data
   */
  async upsert(data: SectorDto) {
    await this.prisma.sector.upsert({
      where: { code: data.code },
      update: data,
      create: data,
    });
  }

  /**
   * Create a new sector
   * @param data
   */
  async create(data: CreateSectorDto) {
    await this.prisma.sector.create({ data });
  }
}
