import { Module } from '@nestjs/common';
import { RoleModule } from '../../modules/role/role.module';
import { CategorieModule } from '../../modules/categories/categorie.module';
import { StartupService } from './startup.service';

@Module({
  imports: [RoleModule, CategorieModule],
  providers: [StartupService],
})
export class StartupModule {}
