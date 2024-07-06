import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles('Utilisateur', 'Administateur')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @Roles('Utilisateur', 'Administateur')
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @Roles('Utilisateur', 'Administateur')
  async findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Review')
  @Roles('Utilisateur', 'Administateur')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Review')
  @Roles('Administateur', 'Utilisateur')
  async remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }

  @Get('/users/:id')
  @Roles('Utilisateur', 'Administateur')
  async findByUser(@Param('id') id: number) {
    return this.reviewService.findByUser(id);
  }
}
