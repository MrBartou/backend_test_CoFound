import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectModule } from './modules/project/project.module';
import { MessageModule } from './modules/message/message.module';
import { ReviewModule } from './modules/review/review.module';
import { SearchModule } from './modules/search/search.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { RoleModule } from './modules/role/role.module';
import { CategorieModule } from './modules/categories/categorie.module';

import { databaseConfig } from './config/database.config';
import { elasticsearchConfig } from './config/elasticsearch.config';
import { jwtConfig } from './config/jwt.config';

import { Project } from './modules/project/entities/project.entities';
import { User } from './modules/user/entities/user.entities';

import { GitHubWebhookController } from './modules/mail/feature-mail.controller';
import { StartupModule } from './utils/startup/startup.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forFeature([Project, User]),
    TypeOrmModule.forRoot(databaseConfig),
    ElasticsearchModule.register(elasticsearchConfig),
    JwtModule.register(jwtConfig),
    UserModule,
    RoleModule,
    ProfileModule,
    CategorieModule,
    ProjectModule,
    ConversationModule,
    MessageModule,
    ReviewModule,
    SearchModule,
    AuthModule,
    MailModule,
    StartupModule,
    ApplicationsModule,
    StatusModule,
  ],
  controllers: [GitHubWebhookController],
})
export class AppModule {}
