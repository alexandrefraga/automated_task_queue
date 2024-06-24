import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
