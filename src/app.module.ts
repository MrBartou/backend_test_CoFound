import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from './config/mail.config';

import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectModule } from './modules/project/project.module';
// import { MessageModule } from './modules/message/message.module';
// import { ReviewModule } from './modules/review/review.module';
// import { SearchModule } from './modules/search/search.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { RoleModule } from './modules/role/role.module';
import { CategorieModule } from './modules/categories/categorie.module';

import { databaseConfig } from './config/database.config';
import { elasticsearchConfig } from './config/elasticsearch.config';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    MailerModule.forRoot(mailConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ElasticsearchModule.register(elasticsearchConfig),
    JwtModule.register(jwtConfig),
    UserModule,
    RoleModule,
    ProfileModule,
    CategorieModule,
    ProjectModule,
    ConversationModule,
    // MessageModule,
    // ReviewModule,
    // SearchModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
