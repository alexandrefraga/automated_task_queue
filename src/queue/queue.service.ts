import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class QueueService {
  private queue = [];
  constructor(private eventEmitter: EventEmitter2) {}

  enqueue(fn: () => Promise<void>): void {
    this.queue.push(fn);
    this.eventEmitter.emit('enqueue', {});
  }

  dequeue(): () => Promise<void> {
    return this.queue.shift();
  }

  getLength(): number {
    return this.queue.length;
  }
}
