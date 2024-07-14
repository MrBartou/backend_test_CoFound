import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsOptional()
  token?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  newPassword: string;
}
