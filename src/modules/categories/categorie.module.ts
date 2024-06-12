import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from './entities/categorie.entities';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categorie]), RoleModule, UserModule],
  providers: [CategorieService, EntityService],
  controllers: [CategorieController],
  exports: [CategorieService],
})
export class CategorieModule {}
