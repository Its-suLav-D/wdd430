import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private docChangedSubscription: Subscription;

  constructor(
    private documentSl: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.documents = this.documentSl.getDocuments();
    this.docChangedSubscription = this.documentSl.documentChangedEvent.subscribe(
      (doc: Document[]) => {
        this.documents = doc;
      }
    );
  }
  ngOnDestroy() {
    this.docChangedSubscription.unsubscribe();
  }
  onNewDocs() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
