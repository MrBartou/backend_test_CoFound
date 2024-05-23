import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entities';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    return this.conversationRepository.save(conversation);
  }

  async findAll(): Promise<Conversation[]> {
    return this.conversationRepository.find({ relations: ['participants'] });
  }

  async findOne(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne({
      where: { conversationId: id },
      relations: ['participants'],
    });
  }

  async update(
    id: number,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation> {
    await this.conversationRepository.update(id, updateConversationDto);
    return this.conversationRepository.findOne({
      where: { conversationId: id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.conversationRepository.delete(id);
  }
}
