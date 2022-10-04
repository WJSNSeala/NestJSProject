import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    /*
    {
      post: postId,
      comment: comment body
      parent_comment?: if recomment, add to parent_comment
    }
    */
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Get('fromPost')
  async findCommentByPost(@Query('postId') postId: number) {
    return this.commentService.findCommentByPost(postId);
  }

  @Get(':id')
  async findOneComment(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
