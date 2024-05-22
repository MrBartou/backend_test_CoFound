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
