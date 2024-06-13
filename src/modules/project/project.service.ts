import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async visible(id: number): Promise<Project> {
    await this.projectRepository.update(id, { projectVisibility: true });
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async cache(id: number): Promise<Project> {
    await this.projectRepository.update(id, { projectVisibility: false });
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async complete(id: number): Promise<Project> {
    await this.projectRepository.update(id, { status: 'completed' });
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async archive(id: number): Promise<Project> {
    await this.projectRepository.update(id, { status: 'archived' });
    return this.projectRepository.findOne({ where: { projectId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
