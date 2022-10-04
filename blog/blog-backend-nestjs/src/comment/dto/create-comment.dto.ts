export class CreateCommentDto {
  postId: number;
  comment: string;
  parentCommentId?: number;
}
