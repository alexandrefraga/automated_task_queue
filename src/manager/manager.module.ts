import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [ManagerService],
})
export class ManagerModule {}
