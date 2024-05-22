import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserService } from '../../modules/user/user.service';
import { RoleService } from '../../modules/role/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn('User not found in request');
      return false;
    }

    const userFromDb = await this.userService.findById(user.userId);
    if (!userFromDb) {
      this.logger.warn(`User with ID ${user.userId} not found in database`);
      return false;
    }

    if (!userFromDb.role) {
      this.logger.warn(`Role not found for user with ID ${user.userId}`);
      return false;
    }

    const userRole = await this.roleService.findOne(userFromDb.role.roleId);
    if (!userRole) {
      this.logger.warn(
        `Role with ID ${userFromDb.role.roleId} not found in database`,
      );
      return false;
    }

    return requiredRoles.includes(userRole.name);
  }
}
