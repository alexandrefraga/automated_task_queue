import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  constructor(private eventEmitter: EventEmitter2) {}
  handle(taskName, timeout): Promise<void> {
    setTimeout(() => {
      this.logger.debug(`${taskName} em execução...`);
      this.eventEmitter.emit('worker-finish', { taskName });
    }, timeout);
    return;
  }
}
