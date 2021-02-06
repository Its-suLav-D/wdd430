import { Document } from './document.model';
import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public docSelected = new EventEmitter<Document>();
  private document: Document[];

  constructor() {
    this.document = MOCKDOCUMENTS;
  }

  getDocuments() {
    //   Return a copy of it.
    return this.document.slice();
  }
  getDocument(id: string): Document {
    return this.document.find((doc) => doc.id === id);
  }
}
