import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entities';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { CategorieModule } from '../categories/categorie.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { EntityService } from 'src/common/services/entity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    CategorieModule,
    UserModule,
    RoleModule,
  ],
  providers: [ReviewService, EntityService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
