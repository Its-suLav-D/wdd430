import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgInput') msgInputRef: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
  onSend() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msg = this.msgInputRef.nativeElement.value;
    const newMsg = new Message(3, subject, msg, 'Sulav', null);
    this.messageService.addMessage(newMsg);

    this.subjectInputRef.nativeElement.value = '';
    this.msgInputRef.nativeElement.value = '';

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgInputRef.nativeElement.value = '';
  }
}
