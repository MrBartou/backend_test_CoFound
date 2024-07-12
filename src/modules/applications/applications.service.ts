import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/applications.entities';
import { CreateApplicationDto } from './dto/create-applications.dto';
import { UpdateApplicationDto } from './dto/update-applications.dto';
import { User } from '../user/entities/user.entities';
import { Project } from '../project/entities/project.entities';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const user = await this.userRepository.findOne({
      where: { userId: createApplicationDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const project = await this.projectRepository.findOne({
      where: { projectId: createApplicationDto.projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const application = this.applicationRepository.create({
      ...createApplicationDto,
      user,
      project,
      status: createApplicationDto.status || 'pending',
    });

    return this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find({ relations: ['user', 'project'] });
  }

  async findOne(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: id },
      relations: ['user', 'project'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async update(
    id: number,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    const application = await this.applicationRepository.preload({
      applicationId: id,
      ...updateApplicationDto,
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return this.applicationRepository.save(application);
  }

  async remove(id: number): Promise<void> {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: id },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    await this.applicationRepository.remove(application);
  }

  async accept(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: id },
      relations: ['user', 'project'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const project = await this.projectRepository.findOne({
      where: { projectId: application.project.projectId },
      relations: ['participants'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (
      !project.participants.find(
        (participant) => participant.userId === application.user.userId,
      )
    ) {
      project.participants.push(application.user);
      await this.projectRepository.save(project);
    }

    application.status = 'accepted';
    return this.applicationRepository.save(application);
  }

  async reject(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: id },
      relations: ['user', 'project'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'rejected';
    return this.applicationRepository.save(application);
  }
}
