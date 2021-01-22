import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'Test', 'Hi There', 'Aron'),
    new Message(2, 'Test2', 'Working Here', 'Sammy'),
  ];

  constructor() {}

  ngOnInit(): void {}
  finalMessage(message: Message) {
    this.messages.push(message);
  }
}
