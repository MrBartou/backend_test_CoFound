import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entities';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { profileId: id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    await this.profileRepository.update(id, updateProfileDto);
    return this.profileRepository.findOne({ where: { profileId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }

  async desactivate(id: number): Promise<void> {
    await this.profileRepository.update(id, { isActive: false });
  }

  async activate(id: number): Promise<void> {
    await this.profileRepository.update(id, { isActive: true });
  }
}
