import { IsNotEmpty, IsArray } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entities';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsArray()
  participants: User[];
}
