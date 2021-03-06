import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public conctChangedEvents = new Subject<Contact[]>();
  private maxContactId: number;

  private contacts: Contact[] = [];
  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
    this.getContactFromFB();
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice();
  }

  getContact(id: Number): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.conctChangedEvents.next(this.contacts.slice());
    this.storeContactToFB();
  }
  getMaxId(): number {
    let maxId: number = 0;
    this.contacts.forEach((contact) => {
      const currentId = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    // this.conctChangedEvents.next(this.contacts.slice());
    this.storeContactToFB();
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!(newContact || originalContact)) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // this.conctChangedEvents.next(this.contacts.slice());
    this.storeContactToFB();
  }

  getContactFromFB() {
    this.http
      .get<Contact[]>(
        'https://cms-d81f4-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe((contact: Contact[]) => {
        this.contacts = contact;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        this.conctChangedEvents.next(this.contacts.slice());
      });
  }

  // Store Contacts in Database

  storeContactToFB() {
    let contacts = JSON.stringify(this.contacts);

    // Create a Header for Content Type

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://cms-d81f4-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers }
      )
      .subscribe(() => {
        this.conctChangedEvents.next(this.contacts.slice());
      });
  }
}
