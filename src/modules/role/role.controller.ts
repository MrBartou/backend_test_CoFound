import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles('Administateur')
  create(@Body() createRoleDto: any) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Roles('Administateur')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles('Administateur', 'Utilisateur')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Administateur')
  update(@Param('id') id: string, @Body() updateRoleDto: any) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('Administateur')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
