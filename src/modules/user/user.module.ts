import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entities';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UserService, EntityService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
