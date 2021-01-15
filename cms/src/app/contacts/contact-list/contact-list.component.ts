import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      1,
      'Bill Gates',
      'jackson@byui.edu',
      '208-496-3771',
      'https://deadline.com/wp-content/uploads/2018/02/bill-gates-2.jpg?w=792',
      null
    ),
    new Contact(
      2,
      'Sulav Dahal',
      'sulav.txt@gmail.com',
      '510-813-7013',
      'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/116155393_1371908999671974_6832323679329311830_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=zFk1O7aTA6wAX94OMJ5&_nc_ht=scontent-sjc3-1.xx&oh=96bf1f725a0872f84f8ed3a1fbd5228a&oe=60242191',
      null
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
