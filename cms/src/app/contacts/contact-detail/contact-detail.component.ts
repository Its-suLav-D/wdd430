import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  display: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    });
  }
  onEditContact() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteContact() {
    this.display = true;
    window.setTimeout(() => {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts'], { relativeTo: this.route });
    }, 500);
  }
}
