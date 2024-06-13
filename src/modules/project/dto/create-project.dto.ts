import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsJSON,
  IsBoolean,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsJSON()
  participants?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  categories?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  requiredSkills?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  budget?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  timeline?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  projectVisibility?: boolean;
}
