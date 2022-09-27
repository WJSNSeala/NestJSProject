import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden custom exception class', HttpStatus.FORBIDDEN);
  }
}
