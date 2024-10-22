import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';
import { Message } from './entities/message.entities';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserModule,
    RoleModule,
    MailModule,
  ],
  providers: [MessageService, EntityService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
