import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entities';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @ManyToOne(() => User, (user) => user.userId)
  user: User;

  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'json', nullable: true })
  experience: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  offers: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  searchingFor: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  location: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  interests: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  roles: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  profileVisibility: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
