import { Role } from 'src/modules/role/entities/role.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Application } from '../../applications/entities/applications.entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lockUntil: Date;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
