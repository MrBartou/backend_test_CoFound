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
  Patch,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles('user', 'admin')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @Roles('user', 'admin')
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  @Roles('user', 'admin')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch(':id/visible')
  @Roles('user', 'admin')
  async visible(@Param('id') id: number) {
    return this.projectService.visible(id);
  }

  @Patch(':id/cache')
  @Roles('user', 'admin')
  async cache(@Param('id') id: number) {
    return this.projectService.cache(id);
  }

  @Patch(':id/complete')
  @Roles('user', 'admin')
  async complete(@Param('id') id: number) {
    return this.projectService.complete(id);
  }

  @Patch(':id/archive')
  @Roles('user', 'admin')
  async archive(@Param('id') id: number) {
    return this.projectService.archive(id);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
