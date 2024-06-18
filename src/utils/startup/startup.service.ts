import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleService } from '../../modules/role/role.service';
import { CategorieService } from '../../modules/categories/categorie.service';

@Injectable()
export class StartupService implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly categoryService: CategorieService,
  ) {}

  async onModuleInit() {
    await this.roleService.createDefaultRoles();
    await this.categoryService.createDefaultCategories();
  }
}
