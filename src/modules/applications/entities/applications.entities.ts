import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Project } from '../../project/entities/project.entities';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(() => Project, (project) => project.applications)
  project: Project;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
