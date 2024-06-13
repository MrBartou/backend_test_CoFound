import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityService } from '../services/entity.service';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private entityService: EntityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const entityId = request.params.id;
    const entityType = this.reflector.get<string>(
      'entityType',
      context.getHandler(),
    );

    if (!entityType) {
      throw new ForbiddenException('Entity type not specified');
    }

    if (user.roles && user.roles.includes('Administateur')) {
      return true;
    }

    const repository = this.entityService.getRepository(entityType);
    const entity = await repository.findOne({
      where: { [entityType === 'User' ? 'userId' : 'id']: entityId },
    });

    if (!entity) {
      throw new ForbiddenException(`${entityType} not found`);
    }

    if (entity.creatorId === user.id) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to modify this resource',
    );
  }
}
