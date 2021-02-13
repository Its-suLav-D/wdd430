import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[];

  constructor(
    private documentSl: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.documents = this.documentSl.getDocuments();
    this.documentSl.documentChangedEvent.subscribe((doc: Document[]) => {
      this.documents = doc;
    });
  }
  onNewDocs() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
