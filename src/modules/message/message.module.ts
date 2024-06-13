import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';
import { Message } from './entities/message.entities';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule, RoleModule],
  providers: [MessageService, EntityService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
