import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { BatchController } from './batch.controller';
import { DynamictaskService } from './dynamictask.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [DynamictaskService],
})
export class BatchModule {}
