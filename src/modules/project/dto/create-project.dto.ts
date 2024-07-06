import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsInt,
  IsObject,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  owner: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  participants?: number[];

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  categories?: number[];

  @IsOptional()
  @IsObject()
  requiredSkills?: Record<string, any>;

  @IsOptional()
  @IsObject()
  budget?: Record<string, any>;

  @IsOptional()
  @IsObject()
  timeline?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  projectVisibility?: boolean;
}
