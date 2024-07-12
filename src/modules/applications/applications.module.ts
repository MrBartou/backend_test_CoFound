import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './applications.service';
import { ApplicationController } from './applications.controller';
import { Application } from './entities/applications.entities';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), RoleModule, UserModule],
  providers: [ApplicationService, EntityService],
  controllers: [ApplicationController],
  exports: [ApplicationService, TypeOrmModule],
})
export class ApplicationsModule {}
