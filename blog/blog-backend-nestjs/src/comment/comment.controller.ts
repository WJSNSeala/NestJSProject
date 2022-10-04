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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/comment')
@ApiTags('Comment writing api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({
    summary: 'create one comment',
    description: '댓글을 하나 작성하고 어떤 Post에 달렸는지 정보를 저장',
  })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all comment list',
    description: '작성된 모든 comment정보를 가져온다.',
  })
  async findAll() {
    return this.commentService.findAll();
  }

  @Get('fromPost')
  @ApiOperation({
    summary: 'get all comment by post id',
    description:
      '특정 Post에 작성된 모든 댓글을 가져온다., 댓글-대댓글 구조로 가져온다.',
  })
  async findCommentByPost(@Query('postId') postId: number) {
    return this.commentService.findCommentByPost(postId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get one comment by comment id',
    description:
      '작성된 댓글을 unique comment Id를 통해 1개만 정보를 가져온다.',
  })
  async findOneComment(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'modify comment by comment id',
    description: '특정 id의 comment를 수정한다.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete comment by comment id',
    description: '특정 id의 comment를 삭제',
  })
  async remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
