import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';

@Controller('api/post')
@ApiTags('Post Writing API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'post creation api',
    description: 'create One Post',
  })
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    const userAddedPost = {
      ...createPostDto,
      userId: req.user.userId,
      username: req.user.username,
    };
    return this.postService.write(userAddedPost);
  }

  @ApiOperation({
    summary: 'get all post list',
    description: '지금까지 작성된 모든 포스트를 가져온다.',
  })
  @Get()
  async findAll(@Param() params) {
    console.log(params);
    return this.postService.findAll();
  }

  @ApiOperation({
    summary: 'get one post by post id',
    description: '작성된 Post를 unique Id를 통해 1개만 정보를 가져온다.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @ApiOperation({
    summary: 'modify one post by id',
    description: '특정 id를 가진 post의 내용을 수정한다.',
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.update(id, updatePostDto);
    return this.postService.findOne(id);
  }

  @ApiOperation({
    summary: 'delete one post by id',
    description: '특정 id를 가진 post를 삭제한다.',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
