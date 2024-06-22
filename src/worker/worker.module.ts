import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { TaskModule } from '../task/task.module';

@Module({
  providers: [WorkerService, TaskModule],
  exports: [WorkerService],
})
export class WorkerModule {}
