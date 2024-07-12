import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entities';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    forwardRef(() => MailModule),
  ],
  providers: [UserService, EntityService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
