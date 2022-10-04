import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  tags: string[];
  publishedDate: Date;
  userId: number;
  username: string;
}
