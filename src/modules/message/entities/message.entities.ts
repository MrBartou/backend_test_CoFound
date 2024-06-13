import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Conversation } from '../../conversation/entities/conversation.entities';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  messageId: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messageId)
  conversation: Conversation;

  @ManyToOne(() => User)
  fromUser: User;

  @ManyToOne(() => User)
  toUser: User;

  @Column('text')
  messageText: string;

  @CreateDateColumn()
  sentAt: Date;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;
}
