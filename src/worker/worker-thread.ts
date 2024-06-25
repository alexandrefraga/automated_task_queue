import { NestFactory } from '@nestjs/core';
import { TaskService } from '../task/task.service';
import { isMainThread, parentPort, workerData } from 'worker_threads';
import { TaskModule } from '../task/task.module';

async function bootstrap() {
  if (!isMainThread) {
    const app = await NestFactory.createApplicationContext(TaskModule, {
      logger: ['warn', 'debug'],
    });
    const taskService = app.get(TaskService);
    const result = await taskService.handleWhile(workerData);

    parentPort.postMessage(result);
    return await app.close();
  }
}

bootstrap();
