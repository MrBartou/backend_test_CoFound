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
import { ApplicationService } from './applications.service';
import { CreateApplicationDto } from './dto/create-applications.dto';
import { UpdateApplicationDto } from './dto/update-applications.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @Roles('Utilisateur', 'Administrateur')
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @Roles('Utilisateur', 'Administrateur')
  async findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @Roles('Utilisateur', 'Administrateur')
  async findOne(@Param('id') id: number) {
    return this.applicationService.findOne(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Application')
  @Roles('Utilisateur', 'Administrateur')
  async update(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Application')
  @Roles('Utilisateur', 'Administrateur')
  async remove(@Param('id') id: number) {
    return this.applicationService.remove(id);
  }

  @Put(':id/accept')
  @UseGuards(CreatorGuard)
  @EntityType('Application')
  @Roles('Utilisateur', 'Administrateur')
  async accept(@Param('id') id: number) {
    return this.applicationService.accept(id);
  }

  @Put(':id/reject')
  @UseGuards(CreatorGuard)
  @EntityType('Application')
  @Roles('Utilisateur', 'Administrateur')
  async reject(@Param('id') id: number) {
    return this.applicationService.reject(id);
  }
}
