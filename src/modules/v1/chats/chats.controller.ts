import {
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './schemas/chat.entity';
import { ApiBasicAuth, ApiBody, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chats')
@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  private readonly logger = new Logger(ChatsController.name);

  /**
   * Get all chats
   * @param request
   */
  @Get()
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  async index(@Request() request): Promise<Chat[]> {
    this.logger.log(
      `Request all chats with options: ${JSON.stringify(request.query)}`,
    );
    return await this.chatsService.findAll();
  }

  /**
   * Get chat by telegram_id
   * @param request
   */
  @Get('/:telegram_id')
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  async show(@Request() request): Promise<Chat> {
    this.logger.log(`Request chat with code: ${request.params.telegram_id}`);
    const chat = await this.chatsService.findOne(request.params.telegram_id);
    if (!chat) {
      throw new NotFoundException(
        `No chat found with code ${request.params.telegram_id}`,
      );
    }
    return chat;
  }

  /**
   * Create chat
   * @param request
   */
  @Post()
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @ApiBody({ type: CreateChatDto })
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() request): Promise<Chat> {
    this.logger.log(`Request to create chat: ${JSON.stringify(request.body)}`);
    const chat = await this.chatsService.findByTelegramIdAndLocation(
      request.body.telegram_id,
      request.body.code,
    );

    if (chat.length > 0) {
      throw new ConflictException(
        `Chat with telegram_id ${request.body.telegram_id} already exists for location ${request.body.code}`,
      );
    }

    return await this.chatsService.create(request.body);
  }

  /**
   * Delete chat by telegram_id
   * @param request
   */
  @Delete('/:telegram_id')
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  async delete(@Request() request): Promise<any> {
    this.logger.log(
      `Request to delete chat with code: ${request.params.telegram_id}`,
    );
    return await this.chatsService.deleteOne(request.params.telegram_id);
  }
}
