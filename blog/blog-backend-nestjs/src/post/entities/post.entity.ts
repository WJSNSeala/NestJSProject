import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '../../users/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  body: string;

  @Column('text', { nullable: true, array: true })
  tags: string[];

  @CreateDateColumn()
  publishedDate: Date;

  @Column()
  userId: number;

  @Column()
  username: string;

  @OneToMany(() => Comment, (comment) => comment.post, {
    eager: true,
  })
  @JoinColumn()
  comments: Comment[];
}
