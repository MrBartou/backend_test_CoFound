import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  projectId: number;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
