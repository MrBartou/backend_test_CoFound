import { applyDecorators, SetMetadata } from '@nestjs/common';

export const ApiVersion = (version: string) =>
  SetMetadata('apiVersion', version);

export const ApiDescription = (description: string) =>
  SetMetadata('apiDescription', description);

export const Api = (version: string, description: string) => {
  return applyDecorators(ApiVersion(version), ApiDescription(description));
};
