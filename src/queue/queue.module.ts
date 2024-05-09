import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { WorkerModule } from '../worker/worker.module';

@Module({
  imports: [WorkerModule],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
