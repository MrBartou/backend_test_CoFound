import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entities';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UserModule, RoleModule],
  providers: [ConversationService, EntityService],
  controllers: [ConversationController],
  exports: [ConversationService],
})
export class ConversationModule {}
