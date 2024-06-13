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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @Roles('Administrateur', 'Utilisateur')
  async findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('User')
  @Roles('Administrateur', 'Utilisateur')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/activate')
  @Roles('Administrateur')
  async confirmEmail(@Param('id') id: number) {
    return this.userService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('Administrateur')
  async deactivate(@Param('id') id: number) {
    return this.userService.deactivate(id);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('User')
  @Roles('Administrateur', 'Utilisateur')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Put('role/:id')
  // @Roles('Administrateur')
  async updateRole(@Param('id') id: number, @Body('roleId') roleId: number) {
    return this.userService.updateRole(id, roleId);
  }
}
