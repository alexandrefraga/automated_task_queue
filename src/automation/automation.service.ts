import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WorkerService } from '../worker/worker.service';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);
  constructor(
    private queueService: QueueService,
    private workerService: WorkerService,
  ) {}

  @Cron('0 * * * * *')
  handle1() {
    this.logger.warn('task1 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handle('task1', 20000),
      'task 01',
    );
  }

  @Cron('1 * * * * *')
  handle2() {
    this.logger.warn('task2 while adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handleWhile('task2 while', 15000),
      'task 02 while',
    );
  }

  @Cron('2 * * * * *')
  handle4() {
    this.logger.warn('task3 while in thread adicionada a fila');
    this.queueService.enqueue(
      () =>
        this.workerService.handleWhileThread('task3 while in thread', 20000),
      'task 03 in thread',
    );
  }
}
