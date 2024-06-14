import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entities';
import { Profile } from '../profile/entities/profile.entities';
import { Project } from '../project/entities/project.entities';
import { Message } from '../message/entities/message.entities';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EntityService } from 'src/common/services/entity.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { Conversation } from '../conversation/entities/conversation.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Project, Message, Conversation]),
    UserModule,
    RoleModule,
  ],
  providers: [SearchService, EntityService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
