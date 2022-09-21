import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class DynamictaskService {
  private readonly logger = new Logger(DynamictaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob(`* * * * * *`, () => {
      this.logger.warn(`run ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);

    this.logger.warn(`Jon ${name} added`);
  }
}
