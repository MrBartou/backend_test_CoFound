import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './entities/categorie.entities';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private readonly categoryRepository: Repository<Categorie>,
  ) {}

  async createDefaultCategories(): Promise<void> {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      const defaultCategories = [
        {
          name: 'Informatique',
          description: 'Projets informatiques',
          type: 'Informatique',
        },
        {
          name: 'Design',
          description: 'Projets de design',
          type: 'Design',
        },
        {
          name: 'Musique',
          description: 'Projets musicaux',
          type: 'Musique',
        },
        {
          name: 'Vidéo',
          description: 'Projets vidéos',
          type: 'Vidéo',
        },
        {
          name: 'Photographie',
          description: 'Projets photographiques',
          type: 'Photographie',
        },
        {
          name: 'Art',
          description: 'Projets artistiques',
          type: 'Art',
        },
      ];
      await this.categoryRepository.save(defaultCategories);
    }
  }

  async create(createCategoryDto: CreateCategorieDto): Promise<Categorie> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Categorie[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Categorie> {
    return this.categoryRepository.findOne({ where: { categorieId: id } });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({ where: { categorieId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
