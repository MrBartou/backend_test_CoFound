import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Message } from 'src/modules/message/entities/message.entities';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  conversationId: number;

  @ManyToMany(() => Message)
  @JoinTable()
  messageId: Message[];

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
