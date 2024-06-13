import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class EntityService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getRepository(entity: string): Repository<any> {
    try {
      return this.connection.getRepository(entity);
    } catch (error) {
      throw new ForbiddenException(`Repository for entity ${entity} not found`);
    }
  }
}
