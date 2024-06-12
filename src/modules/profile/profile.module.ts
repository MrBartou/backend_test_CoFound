import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entities';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), RoleModule, UserModule],
  providers: [ProfileService, EntityService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
