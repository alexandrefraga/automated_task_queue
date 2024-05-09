import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AutomationService } from './automation.service';
import { WorkerModule } from '../worker/worker.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [ScheduleModule.forRoot(), WorkerModule, QueueModule],
  providers: [AutomationService],
})
export class AutomationModule {}
