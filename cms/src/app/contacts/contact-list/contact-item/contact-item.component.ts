import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Output() selectedPerson = new EventEmitter<void>();

  @Input() item: Contact

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(){
    this.selectedPerson.emit()
  }

}
