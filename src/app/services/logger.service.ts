import { Injectable } from '@angular/core';

import { RingBuffer } from 'ring-buffer-ts';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly ringBuffer = new RingBuffer<string>(50);

  public logs = new BehaviorSubject<Array<string>>([]);

  constructor() { }

  logMessage(msg: string) {
    this.ringBuffer.add(msg);

    this.logs.next(this.ringBuffer.toArray());
  }
}
