import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/entities/post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  // 동일 email 유저 생성 방ㅈ
  username: string;

  @Column()
  password: string;
}

export default User;
