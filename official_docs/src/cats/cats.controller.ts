import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseFilters,
  Param,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { RolesGuard } from '../gurads/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { User } from '../decorators/user.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@User() user): Promise<Cat[]> {
    console.log(user);
    return this.catsService.findAll();
  }

  @Get('/exception-filters')
  @UseFilters(new HttpExceptionFilter())
  async findAllExcept() {
    throw new ForbiddenException();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
