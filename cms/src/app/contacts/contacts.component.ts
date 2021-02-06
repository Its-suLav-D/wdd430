import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  selectedPerson: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.conctSelected.subscribe((conct: Contact) => {
      this.selectedPerson = conct;
    });
  }
}
