import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private contactChangedSubscription: Subscription;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactChangedSubscription = this.contactService.conctChangedEvents.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
  }
  ngOnDestroy() {
    this.contactChangedSubscription.unsubscribe();
  }
  onNewContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
