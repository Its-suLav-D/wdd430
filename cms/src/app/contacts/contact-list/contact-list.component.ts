import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  term: string;
  private contactChangedSubscription: Subscription;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    this.contactChangedSubscription = this.contactService.conctChangedEvents.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
    this.contactService.getContactFromFB();
  }
  ngOnDestroy() {
    this.contactChangedSubscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }
  onNewContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
