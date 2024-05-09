import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  constructor(private eventEmitter: EventEmitter2) {}
  handle(msg, timeout): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (false) {
          reject(new Error());
        }
        this.logger.debug(msg);
        this.eventEmitter.emit('worker-finish', {});
        resolve(null);
      }, timeout);
    });
  }
}
