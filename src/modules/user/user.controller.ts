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
import { Roles } from '../../common/decorators/roles.decorator';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('Administrateur')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @Roles('Administrateur', 'Utilisateur')
  async findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles('Administrateur', 'Utilisateur')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/activate')
  @Roles('Administrateur')
  async confirmEmail(@Param('id') id: number) {
    return this.userService.activate(id);
  }

  @Patch(':id/desactivate')
  @Roles('Administrateur')
  async deactivate(@Param('id') id: number) {
    return this.userService.deactivate(id);
  }

  @Delete(':id')
  @Roles('Administrateur')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
