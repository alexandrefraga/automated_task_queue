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

  @Cron('15 * * * * *')
  handle15() {
    this.logger.warn('handle15 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handle('handle15', 25000),
      'handle 15',
    );
  }

  @Cron('30 * * * * *')
  handle30() {
    this.logger.warn('handle30 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handle('handle30', 10000),
      'handle 30',
    );
  }

  @Cron('35 * * * * *')
  handle30a() {
    this.logger.warn('handle35 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handle('handle35', 5000),
      'handle 35',
    );
  }

  @Cron('40 * * * * *')
  handle32() {
    this.logger.warn('handle40 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handleThread('handle40', 5000),
      'handle thread 40',
    );
  }

  @Cron('45 * * * * *')
  handle45() {
    this.logger.warn('handle45 adicionada a fila');
    this.queueService.enqueue(
      () => this.workerService.handle('handle45', 10000),
      'handle 45',
    );
  }
}
