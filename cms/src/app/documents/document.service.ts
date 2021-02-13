import { Document } from './document.model';
import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // public docSelected = new EventEmitter<Document>();
  public documentChangedEvent = new EventEmitter<Document[]>();
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
  deleteDocument(doc: Document, id: string): Document {
    if (!doc) {
      return;
    }
    const pos = this.document.indexOf(doc);
    if (pos < 0) {
      return;
    }
    this.document.splice(pos, 1);
    // const result = this.document.filter((doc) => doc.id !== id);
    // this.documentChangedEvent.emit(this.document.slice());
    this.documentChangedEvent.emit(this.document.slice());
  }
}
