import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string) {
    let filteredContact: Contact[] = [];

    if (term && term.length > 0) {
      filteredContact = contacts.filter((contact: Contact) => {
        contact.name.toLowerCase().includes(term.toLowerCase());
      });
    }
    if (filteredContact.length < 1) {
      return contacts;
    }
    return filteredContact;
  }
}
