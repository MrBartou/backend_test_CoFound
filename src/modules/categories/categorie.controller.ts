import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategorieController {
  constructor(private readonly categoryService: CategorieService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categoryService.create(createCategorieDto);
  }

  @Get()
  @Roles('user', 'admin')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categoryService.update(id, updateCategorieDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}