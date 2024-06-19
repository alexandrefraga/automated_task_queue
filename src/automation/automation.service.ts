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
    this.queueService.enqueue(() =>
      this.workerService.handle('handle15', 25000),
    );
  }

  @Cron('30 * * * * *')
  handle30() {
    this.logger.warn('handle30 adicionada a fila');
    this.queueService.enqueue(() =>
      this.workerService.handle('handle30', 10000),
    );
  }

  @Cron('31 * * * * *')
  handle30a() {
    this.logger.warn('handle31 adicionada a fila');
    this.queueService.enqueue(() =>
      this.workerService.handle('handle31', 7000),
    );
  }

  @Cron('45 * * * * *')
  handle45() {
    this.logger.warn('handle45 adicionada a fila');
    this.queueService.enqueue(() =>
      this.workerService.handle('handle45', 20000),
    );
  }
}
