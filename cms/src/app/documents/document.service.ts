import { Document } from './document.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // public docSelected = new EventEmitter<Document>();
  public documentChangedEvent = new Subject<Document[]>();
  private document: Document[];
  maxDocumentId: number;

  constructor() {
    this.document = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    this.documentChangedEvent.next(this.document.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    this.document.forEach((doc) => {
      const currentId = Number(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }
    this.maxDocumentId++;
    let newDocId = Number(newDocument.id);
    newDocId = this.maxDocumentId;
    this.document.push(newDocument);
    const documentListClone = this.document.slice();
    this.documentChangedEvent.next(documentListClone);
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || newDocument) {
      return;
    }
    const pos = this.document.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.document[pos] = newDocument;
    const documentListClone = this.document.slice();
    this.documentChangedEvent.next(documentListClone);
  }
}
