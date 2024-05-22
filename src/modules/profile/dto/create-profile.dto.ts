import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsJSON,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsJSON()
  experience?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  offers?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  searchingFor?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  location?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  interests?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  roles?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  profileVisibility?: boolean;
}
