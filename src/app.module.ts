import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// import { UserModule } from './modules/user/user.module';
// import { ProfileModule } from './modules/profile/profile.module';
// import { ProjectModule } from './modules/project/project.module';
// import { MessageModule } from './modules/message/message.module';
// import { ReviewModule } from './modules/review/review.module';
// import { SearchModule } from './modules/search/search.module';
// import { AuthModule } from './modules/auth/auth.module';

import { databaseConfig } from './config/database.config';
import { elasticsearchConfig } from './config/elasticsearch.config';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ElasticsearchModule.register(elasticsearchConfig),
    JwtModule.register(jwtConfig),
    // UserModule,
    // ProfileModule,
    // ProjectModule,
    // MessageModule,
    // ReviewModule,
    // SearchModule,
    // AuthModule,
  ],
})
export class AppModule {}
