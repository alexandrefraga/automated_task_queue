import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Worker } from 'worker_threads';
import { TaskService } from '../task/task.service';

type WorkerResult = {
  taskName: string;
  data: any;
};

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  // constructor(private taskService: TaskService) {}
  async handle(taskName, timeout): Promise<WorkerResult> {
    return new Promise<WorkerResult>((resolve) => {
      this.logger.debug(`${taskName} em execução...`);
      setTimeout(() => {
        resolve({ taskName, data: {} });
      }, timeout);
    });
    // const data = await this.taskService.handle({ taskName, timeout });
    // return { taskName, data };
  }

  handleThread(taskName, timeout): Promise<WorkerResult> {
    return new Promise<WorkerResult>((resolve, reject) => {
      const worker = new Worker('./dist/worker/worker-thread.js', {
        workerData: { taskName, timeout },
      });

      worker.on('message', (data) => resolve({ taskName, data }));
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`worker erro: ${code}`));
        }
      });
    });
  }
}
