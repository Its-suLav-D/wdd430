import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public conctChangedEvents = new Subject<Contact[]>();
  private maxContactId: number;

  private contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    this.conctChangedEvents.next(this.contacts.slice());
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
    const contactListClone = this.contacts.slice();
    this.conctChangedEvents.next(contactListClone);
  }
  updateContact(newContact: Contact, originalContact: Contact) {
    if (!newContact || originalContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactListClone = this.contacts.slice();
    this.conctChangedEvents.next(contactListClone);
  }
}
