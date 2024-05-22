import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
