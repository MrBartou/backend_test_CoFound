import { IsString, IsOptional } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
