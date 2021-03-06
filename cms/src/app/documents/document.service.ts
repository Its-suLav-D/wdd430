import { Document } from './document.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // public docSelected = new EventEmitter<Document>();
  public documentChangedEvent = new Subject<Document[]>();
  private document: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.document = MOCKDOCUMENTS;
    this.getDocumentFromFB();
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
    // this.documentChangedEvent.next(this.document.slice());
    // Store the document to the Firebase
    this.storeDocumentToFB();
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
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;

    // let newDocId = Number(newDocument.id);
    // newDocId = this.maxDocumentId;
    newDocument.id = this.maxDocumentId.toString();
    this.document.push(newDocument);
    // this.documentChangedEvent.next(this.document.slice());
    this.storeDocumentToFB();
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!(originalDocument || newDocument)) {
      return;
    }
    const pos = this.document.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.document[pos] = newDocument;
    // this.documentChangedEvent.next(this.document.slice());
    this.storeDocumentToFB();
  }

  // Firebase Setup

  getDocumentFromFB() {
    this.http
      .get<Document[]>(
        'https://cms-d81f4-default-rtdb.firebaseio.com/documents.json'
      )
      //  Success
      .subscribe((document: Document[]) => {
        this.document = document;
        this.maxDocumentId = this.getMaxId();
        //sort alphabetically by name
        this.document.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        this.documentChangedEvent.next(this.document.slice());
      }),
      // Error Message
      (error: any) => {
        console.log(error);
      };
  }

  //  Store Documents in Database

  storeDocumentToFB() {
    // Stringify -- convert it to JSON
    let documents = JSON.stringify(this.document);

    // Create a header for content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Put Method to store the documents in the Firebase

    // Put will overide what was their earlier.

    this.http
      .put(
        'https://cms-d81f4-default-rtdb.firebaseio.com/documents.json',
        documents,
        {
          headers: headers,
        }
      )
      .subscribe(() => {
        //If We successfully put, signal that doucment list has changed and send a copy to document list
        this.documentChangedEvent.next(this.document.slice());
      });
  }
}
