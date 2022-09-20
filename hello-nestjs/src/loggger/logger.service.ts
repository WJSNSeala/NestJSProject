import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  verbose(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
}
