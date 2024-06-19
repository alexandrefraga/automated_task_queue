import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class ManagerService {
  private readonly logger = new Logger(ManagerService.name);
  private maxProcess = 1;
  private countProcess = 0;
  constructor(private queueService: QueueService) {}
  @OnEvent('enqueue')
  handleEnqueue() {
    this.logger.log(`Manager notify about enqueue`);
    if (this.countProcess < this.maxProcess) {
      this.countProcess += 1;
      const task = this.queueService.dequeue();
      Promise.all([task()]);
    }
  }

  @OnEvent('worker-finish')
  handleWorkerFinish(payload) {
    this.logger.log(`Manager notify finish ${payload.taskName}`);
    this.countProcess -= 1;

    const queueLentgth = this.queueService.getLength();
    if (this.countProcess < this.maxProcess && queueLentgth) {
      this.countProcess += 1;
      const task = this.queueService.dequeue();
      Promise.all([task()]);
    }
  }
}
