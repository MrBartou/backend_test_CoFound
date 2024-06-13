import { SetMetadata } from '@nestjs/common';

export const EntityType = (entityType: string) =>
  SetMetadata('entityType', entityType);
