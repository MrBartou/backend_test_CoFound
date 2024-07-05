import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Categorie } from '../../categories/entities/categorie.entities';

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

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @ManyToMany(() => Categorie, (category) => category.projects)
  @JoinTable()
  categories: Categorie[];

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
