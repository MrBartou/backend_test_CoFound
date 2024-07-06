import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../user/entities/user.entities';
import { Categorie } from '../categories/entities/categorie.entities';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Categorie)
    private readonly categoryRepository: Repository<Categorie>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { participants, categories, owner, ...projectData } =
      createProjectDto;

    const ownerEntity = await this.userRepository.findOne({
      where: { userId: owner },
    });
    if (!ownerEntity) {
      throw new BadRequestException(`Owner with ID ${owner} not found`);
    }

    const participantEntities = participants
      ? await this.userRepository.findByIds(participants)
      : [];
    if (participants && participants.length !== participantEntities.length) {
      throw new BadRequestException(`Some participants not found`);
    }

    const categoryEntities = categories
      ? await this.categoryRepository.findByIds(categories)
      : [];
    if (categories && categories.length !== categoryEntities.length) {
      throw new BadRequestException(`Some categories not found`);
    }

    const project = this.projectRepository.create({
      ...projectData,
      owner: ownerEntity,
      participants: participantEntities,
      categories: categoryEntities,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['participants', 'categories'],
    });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const { participants, categories, owner, ...projectData } =
      updateProjectDto;

    const project = await this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found`);
    }

    // Validate owner
    if (owner) {
      const ownerEntity = await this.userRepository.findOne({
        where: { userId: owner },
      });
      if (!ownerEntity) {
        throw new BadRequestException(`Owner with ID ${owner} not found`);
      }
      project.owner = ownerEntity;
    }

    if (participants) {
      const participantEntities =
        await this.userRepository.findByIds(participants);
      if (participants.length !== participantEntities.length) {
        throw new BadRequestException(`Some participants not found`);
      }
      project.participants = participantEntities;
    }

    if (categories) {
      const categoryEntities =
        await this.categoryRepository.findByIds(categories);
      if (categories.length !== categoryEntities.length) {
        throw new BadRequestException(`Some categories not found`);
      }
      project.categories = categoryEntities;
    }

    Object.assign(project, projectData);

    return this.projectRepository.save(project);
  }

  async visible(id: number): Promise<Project> {
    await this.projectRepository.update(id, { projectVisibility: true });
    return this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
  }

  async cache(id: number): Promise<Project> {
    await this.projectRepository.update(id, { projectVisibility: false });
    return this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
  }

  async complete(id: number): Promise<Project> {
    await this.projectRepository.update(id, { status: 'completed' });
    return this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
  }

  async archive(id: number): Promise<Project> {
    await this.projectRepository.update(id, { status: 'archived' });
    return this.projectRepository.findOne({
      where: { projectId: id },
      relations: ['participants', 'categories'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async findUserProjects(userId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { owner: { userId } },
      relations: ['participants', 'categories'],
    });
  }

  async findCategoryProjects(categorieId: number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.categories', 'categorie')
      .where('categorie.categorieId = :categorieId', { categorieId })
      .getMany();
  }
}
