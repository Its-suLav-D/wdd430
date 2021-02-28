import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  contactForm: FormGroup;
  originalContact: Contact;
  editMode: boolean = false;
  id_Contact: number;
  contact: Contact;
  groupContacts: Contact[] = [];
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_Contact = Number(params['id']);
      this.originalContact = this.contactService.getContact(this.id_Contact);
      if (!params['id']) {
        this.editMode = false;
      }
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      // if (this.contact.group) {
      //   // this.groupContacts = JSON.parse(
      //   //   JSON.stringify(this.originalContact.group)
      //   // );
      //   this.groupContacts = this.contact.group;
      // }

      if (this.contact.group) {
        // this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        this.groupContacts = [...this.contact.group];
      }

      // this.initForm();
      console.log(this.originalContact);
      console.log(this.groupContacts);
      // console.log(typeof this.id_Contact);
      console.log('yei ho ', this.contact);
    });
  }
  // initForm() {
  //   let contact_Name = '';
  //   let contact_Email = '';
  //   let contact_Phone = '';
  //   let contact_Image = '';
  //   if (this.editMode) {
  //     const contact = this.contactService.getContact(this.id_Contact);
  //     contact_Name = contact.name;
  //     contact_Email = contact.email;
  //     contact_Phone = contact.phone;
  //     contact_Image = contact.imageUrl;
  //   }
  //   this.contactForm = new FormGroup({
  //     name: new FormControl(contact_Name, Validators.required),
  //     email: new FormControl(contact_Email, [
  //       Validators.required,
  //       Validators.email,
  //       Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$”'),
  //     ]),
  //     phone: new FormControl(contact_Phone, [
  //       Validators.required,
  //       Validators.pattern('D*([2-9]d{2})(D*)([2-9]d{2})(D*)(d{4})D*'),
  //     ]),
  //     imageUrl: new FormControl(contact_Image, Validators.required),
  //   });
  // }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  // contactSubmit() {
  //   const contact_Title = this.contactForm.value['name'];
  //   const contact_Email = this.contactForm.value['email'];
  //   const contact_phone = this.contactForm.value['phone'];
  //   const contact_Image = this.contactForm.value['imageUrl'];

  //   const newContact = new Contact(
  //     null,
  //     contact_Title,
  //     contact_Email,
  //     contact_phone,
  //     contact_Image,
  //     null
  //   );
  //   if (this.editMode) {
  //     this.contactService.updateContact(this.originalContact, newContact);
  //   } else {
  //     this.contactService.addContact(newContact);
  //   }
  //   console.log(this.contactForm);
  //   this.onCancel();
  //   console.log(this.contact);
  // }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(
      null,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
    console.log(newContact);
    console.log(form);
    console.log(this.groupContacts);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
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
