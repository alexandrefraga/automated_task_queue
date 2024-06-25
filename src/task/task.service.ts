import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  handle(workerData): Promise<any> {
    return new Promise((resolve) => {
      this.logger.debug(`${workerData.taskName} em execução...`);

      setTimeout(() => {
        resolve(`result of ${workerData.taskName}`);
      }, workerData.timeout);
    });
  }

  handleWhile(workerData) {
    return new Promise((resolve) => {
      this.logger.debug(`${workerData.taskName} em execução...`);
      const dateNow = Date.now();
      while (Date.now() - dateNow < workerData.timeout) {}
      resolve(`result of ${workerData.taskName}`);
    });
  }
}
