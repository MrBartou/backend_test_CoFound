import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entities';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { EntityService } from 'src/common/services/entity.service';
import { CategorieModule } from '../categories/categorie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    RoleModule,
    UserModule,
    CategorieModule,
  ],
  providers: [ProjectService, EntityService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
