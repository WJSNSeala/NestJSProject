import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
=======
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
>>>>>>> e8039b035461638d1bf70e0564e80ce31f5e0446
})
export class AppModule {}
