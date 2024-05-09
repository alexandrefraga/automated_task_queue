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
    this.logger.warn('handle15');
    this.queueService.enqueue(() =>
      this.workerService.handle('Called when the current second is 15', 25000),
    );
  }

  @Cron('30 * * * * *')
  handle30() {
    this.logger.warn('handle30');
    this.queueService.enqueue(() =>
      this.workerService.handle('Called when the current second is 30', 10000),
    );
  }

  @Cron('31 * * * * *')
  handle30a() {
    this.logger.warn('handle31');
    this.queueService.enqueue(() =>
      this.workerService.handle('Called when the current second is 31', 7000),
    );
  }

  //   @Cron('45 * * * * *')
  //   handle45() {
  //     this.queueService.enqueue(() =>
  //       this.workerService.handle('Called when the current second is 45', 6000),
  //     );
  //   }
}
