import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsInt()
  conversationId: number;

  @IsNotEmpty()
  @IsInt()
  fromUserId: number;

  @IsNotEmpty()
  @IsInt()
  toUserId: number;

  @IsNotEmpty()
  @IsString()
  messageText: string;
}
