export class CreatePostDto {
  id: number;
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  userId: number;
  username: string;
}
