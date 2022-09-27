<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { JoiValidationPipe } from 'src/pipes/joi-schema-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/exception-filters')
  @UseFilters(new HttpExceptionFilter())
  async findAllExcept() {
    throw new ForbiddenException();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
=======
import { Controller } from '@nestjs/common';

@Controller('cats')
export class CatsController {}
>>>>>>> e8039b035461638d1bf70e0564e80ce31f5e0446
