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
import User from '../users/user.entity';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    const userAddedPost = {
      ...createPostDto,
      userId: req.user.userId,
      username: req.user.username,
    };
    return this.postService.write(userAddedPost);
  }

  @Get()
  async findAll(@Param() params) {
    console.log(params);
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.update(id, updatePostDto);
    return this.postService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
