import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  handle(workerData): Promise<any> {
    return new Promise((resolve) => {
      this.logger.debug(`${workerData.taskName} em execução...`);

      setTimeout(() => {
        resolve(`result of task ${workerData.taskName}`);
      }, workerData.timeout);
    });
  }
}
