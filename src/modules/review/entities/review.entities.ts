import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Categorie } from 'src/modules/categories/entities/categorie.entities';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @ManyToOne(() => User, (user) => user.userId)
  reviewer: User;

  @ManyToOne(() => Categorie, (Categorie) => Categorie.categorieId)
  subject: Categorie;

  @Column()
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
