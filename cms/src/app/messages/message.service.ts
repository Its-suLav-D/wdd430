import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MESSAGES';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private message: Message[];

  constructor() {
    this.message = MOCKMESSAGES;
  }
  getMessages(): Message[] {
    return this.message.slice();
  }

  getMessage(id: Number) {
    return this.message.find((m) => m.id === id);
  }
  addMessage(message: Message) {
    this.message.push(message);
    this.messageChangedEvent.emit(this.message.slice());
  }
}
