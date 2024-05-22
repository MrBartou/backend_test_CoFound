import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entities';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  projectId: number;

  @ManyToOne(() => User, (user) => user.userId)
  owner: User;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ type: 'json', nullable: true })
  participants: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  categories: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  requiredSkills: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  budget: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  timeline: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  projectVisibility: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
