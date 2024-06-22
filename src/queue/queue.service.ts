import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class QueueService {
  private queue = [];
  constructor(private eventEmitter: EventEmitter2) {}

  enqueue(fn: () => Promise<any>, taskName?: string): void {
    this.queue.push(fn);
    this.eventEmitter.emit(`enqueue`, { taskName });
  }

  dequeue(): () => Promise<any> {
    return this.queue.shift();
  }

  getLength(): number {
    return this.queue.length;
  }
}
