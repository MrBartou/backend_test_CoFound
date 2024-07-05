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
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles('Utilisateur', 'Administrateur')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @Roles('Utilisateur', 'Administrateur')
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @Roles('Utilisateur', 'Administrateur')
  async findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch(':id/visible')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async visible(@Param('id') id: number) {
    return this.projectService.visible(id);
  }

  @Patch(':id/cache')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async cache(@Param('id') id: number) {
    return this.projectService.cache(id);
  }

  @Patch(':id/complete')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async complete(@Param('id') id: number) {
    return this.projectService.complete(id);
  }

  @Patch(':id/archive')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async archive(@Param('id') id: number) {
    return this.projectService.archive(id);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Project')
  @Roles('Utilisateur', 'Administrateur')
  async remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }

  @Get('/users/:id')
  @Roles('Utilisateur', 'Administrateur')
  async findUserProjects(@Param('id') id: number) {
    return this.projectService.findUserProjects(id);
  }

  @Get('/categories/:id')
  @Roles('Utilisateur', 'Administrateur')
  async findCategoryProjects(@Param('id') id: number) {
    return this.projectService.findCategoryProjects(id);
  }
}
