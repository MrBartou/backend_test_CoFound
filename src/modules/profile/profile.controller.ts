import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @Roles('Utilisateur', 'Administateur')
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @Roles('Administateur')
  async findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @Roles('Utilisateur', 'Administateur')
  async findOne(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @Patch(':id/desactivate')
  @UseGuards(CreatorGuard)
  @EntityType('Profile')
  @Roles('Administateur', 'Utilisateur')
  async desactivate(@Param('id') id: number) {
    return this.profileService.desactivate(id);
  }

  @Patch(':id/activate')
  @UseGuards(CreatorGuard)
  @EntityType('Profile')
  @Roles('Administateur', 'Utilisateur')
  async activate(@Param('id') id: number) {
    return this.profileService.activate(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Profile')
  @Roles('Utilisateur', 'Administateur')
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Profile')
  @Roles('Administateur')
  async remove(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}
