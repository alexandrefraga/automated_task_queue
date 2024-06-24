import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class ManagerService {
  private readonly logger = new Logger(ManagerService.name);
  private maxProcess = 1;
  private countProcess = 0;
  constructor(
    private queueService: QueueService,
    private eventEmitter: EventEmitter2,
  ) {}
  @OnEvent('enqueue')
  handleEnqueue(payload) {
    this.logger.log(`Manager notify about enqueue ${payload.taskName}`);
    if (this.countProcess < this.maxProcess) {
      this.countProcess += 1;
      const task = this.queueService.dequeue();
      this.handleTask(task);
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
      this.handleTask(task);
    }
  }

  private handleTask(task: () => Promise<any>) {
    task()
      .then((resp) => {
        this.logger.log(
          `Response of worker to manager: ${JSON.stringify(resp)}`,
        );
        this.eventEmitter.emit('worker-finish', {
          taskName: resp.taskName,
        });
      })
      .catch(console.error);
  }
}
