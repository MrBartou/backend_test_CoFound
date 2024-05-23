import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entities';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  conversationId: number;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
