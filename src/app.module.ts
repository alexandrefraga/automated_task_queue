import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomationModule } from './automation/automation.module';
import { WorkerModule } from './worker/worker.module';
import { QueueModule } from './queue/queue.module';
import { ManagerModule } from './manager/manager.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AutomationModule,
    WorkerModule,
    QueueModule,
    ManagerModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
