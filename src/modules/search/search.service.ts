import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../user/entities/user.entities';
import { Profile } from '../profile/entities/profile.entities';
import { Project } from '../project/entities/project.entities';
import { Message } from '../message/entities/message.entities';
import { Conversation } from '../conversation/entities/conversation.entities';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async searchUsers(query: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { username: ILike(`%${query}%`) },
    });
    return users;
  }

  async searchProfiles(query: string): Promise<Profile[]> {
    const profiles = await this.profileRepository.find({
      where: { skills: ILike(`%${query}%`) },
    });
    return profiles;
  }

  async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: { title: ILike(`%${query}%`) },
    });
    return projects;
  }

  async searchMessages(query: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { messageText: ILike(`%${query}%`) },
    });
    return messages;
  }

  async searchConversation(query: string): Promise<Conversation[]> {
    const conversations = await this.conversationRepository.find({
      where: { participants: ILike(`%${query}%`) },
    });
    return conversations;
  }
}
