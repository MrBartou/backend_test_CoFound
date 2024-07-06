import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createDefaultRoles(): Promise<void> {
    const roles = await this.roleRepository.find();
    if (roles.length === 0) {
      const defaultRoles = [
        {
          name: 'Administrateur',
          description: "role d'administration du site",
        },
        {
          name: 'Utilisateur',
          description: 'Role par défault du site',
        },
      ];
      await this.roleRepository.save(defaultRoles);
    }
  }

  async create(createRoleDto: any): Promise<Role> {
    return this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { roleId: id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: any): Promise<Role> {
    await this.roleRepository.save({ id, ...updateRoleDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
