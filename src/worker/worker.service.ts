import { Injectable, Logger } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { TaskService } from '../task/task.service';

type WorkerResult = {
  taskName: string;
  data: any;
};

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  constructor(private taskService: TaskService) {}

  async handle(taskName, timeout): Promise<WorkerResult> {
    const data = await this.taskService.handle({ taskName, timeout });
    return { taskName, data };
  }

  async handleWhile(taskName, timeout): Promise<WorkerResult> {
    const data = await this.taskService.handleWhile({ taskName, timeout });
    return { taskName, data };
  }

  handleWhileThread(taskName, timeout): Promise<WorkerResult> {
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
