import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entities';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['conversation', 'fromUser', 'toUser'],
    });
  }

  async findOne(id: number): Promise<Message> {
    return this.messageRepository.findOne({
      where: { messageId: id },
      relations: ['conversation', 'fromUser', 'toUser'],
    });
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    await this.messageRepository.update(id, updateMessageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async read(id: number): Promise<void> {
    const message = await this.findOne(id);
    message.read = true;
    message.readAt = new Date();
    await this.messageRepository.save(message);
  }

  async getAllMessageByConversationId(id: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation: { conversationId: id } },
      relations: ['conversation', 'fromUser', 'toUser'],
    });
  }
}
