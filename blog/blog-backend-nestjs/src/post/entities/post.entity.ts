import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column('text', { array: true })
  tags: string[];

  @CreateDateColumn()
  publishedDate: Date;

  @Column()
  userId: number;

  @Column()
  username: string;
}
