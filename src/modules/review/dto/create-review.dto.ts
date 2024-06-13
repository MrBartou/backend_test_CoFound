import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsNumber()
  reviewerId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;
}
