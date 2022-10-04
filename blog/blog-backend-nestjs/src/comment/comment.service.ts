import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Not, Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    @InjectRepository(Post) private readonly post: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { postId, comment, parentCommentId } = createCommentDto;
    const ownerPost = await this.post.findOneBy({ id: postId });
    const newComment = new Comment();

    newComment.comment = comment;
    newComment.ownerPostId = postId;

    if (parentCommentId) {
      const parentCommentToRecomment = await this.comment.findOneBy({
        id: parentCommentId,
      });
      newComment.parent = parentCommentToRecomment;
      newComment.hasParentComment = true;
    }

    await this.comment.save(newComment);

    if (ownerPost.comments) {
      ownerPost.comments.push(newComment);
    } else {
      ownerPost.comments = [newComment];
    }
    await this.post.save(ownerPost);
  }

  async findAll() {
    return this.comment.find();
  }

  async findCommentByPost(postId: number) {
    return this.comment.find({
      relations: ['recomments'],
      where: { ownerPostId: postId, hasParentComment: false },
      order: {
        date: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return this.comment.findOneBy({ id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.comment.update(id, { ...updateCommentDto });
  }

  async remove(id: number) {
    return await this.comment
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('id = :id', { id })
      .execute();
  }
}
