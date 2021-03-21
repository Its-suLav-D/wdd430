import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  private message: Message[];

  constructor(private http: HttpClient) {
    // this.message = MOCKMESSAGES;
    // this.getMessageFromFB();
  }
  // getMessages(): Message[] {
  //   // return this.message.slice();
  // }

  getMessage(id: Number) {
    return this.message.find((m) => m.id === id);
  }
  // addMessage(message: Message) {
  //   this.message.push(message);
  //   // this.messageChangedEvent.emit(this.message.slice());
  //   this.storeMessageToFB();
  // }

  // method to get max id number in contact list
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the message list
    for (const message of this.message) {
      //get current id as a number
      const currentId = +message.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }

  // getMessageFromFB() {
  //   //use http get
  //   this.http
  //     .get('https://cms-d81f4-default-rtdb.firebaseio.com/messages.json')
  //     .subscribe((message: Message[]) => {
  //       this.message = message;
  //       this.maxMessageId = this.getMaxId();
  //       this.message.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
  //       //signal that the list has changed
  //       this.messageChangedEvent.next(this.message.slice());
  //     }),
  //     (error: any) => {
  //       console.log(error);
  //     };
  // }

  // storeMessageToFB() {
  //   //stringify the list of documnts
  //   let messages = JSON.stringify(this.message);

  //   //create header for content type
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });
  //   this.http
  //     .put(
  //       'https://cms-d81f4-default-rtdb.firebaseio.com/message.json',
  //       messages,
  //       {
  //         headers: headers,
  //       }
  //     )

  //     // Subscribe to Response

  //     .subscribe(() => {
  //       //once a response has been received, signal that the document list has changed, send copy of list
  //       this.messageChangedEvent.next(this.message.slice());
  //     });
  // }

  sortAndSend() {
    this.message.sort((a, b) => {
      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.message.slice());
  }
  getMessages() {
    this.http.get('http://localhost:3000/messages').subscribe(
      //success method
      (messages: any) => {
        console.log(messages.messages);
        this.message = messages.messages;
        this.sortAndSend();
      },
      //error method
      (error: any) => {
        console.log(error);
      }
    );
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    // make sure id of the new Message is empty
    newMessage.id = 0;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; newMessage: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        console.log(responseData.newMessage);
        this.message.push(responseData.newMessage);
        this.sortAndSend();
      });
  }
}

//
