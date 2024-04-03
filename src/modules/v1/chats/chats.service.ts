import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './schemas/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  findAll(): Promise<Chat[]> {
    return this.chatsRepository.find();
  }

  findOne(code: string): Promise<Chat> {
    return this.chatsRepository.findOneBy({ telegram_id: code });
  }

  findByTelegramIdAndLocation(
    telegram_id: string,
    location: string,
  ): Promise<Chat[]> {
    return this.chatsRepository.findBy({
      telegram_id: telegram_id,
      code: location,
    });
  }

  async create(data: CreateChatDto): Promise<Chat> {
    const chat = this.chatsRepository.create(data);
    await this.chatsRepository.save(data);
    return chat;
  }

  deleteOne(id: string): Promise<any> {
    return this.chatsRepository.delete(id);
  }
}
