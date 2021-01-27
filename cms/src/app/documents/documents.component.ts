import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService],
})
export class DocumentsComponent implements OnInit {
  public selectedDocument: Document;
  constructor(private documentSl: DocumentService) {}

  ngOnInit() {
    this.documentSl.docSelected.subscribe((doc: Document) => {
      this.selectedDocument = doc;
    });
  }
}
