import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  docs: Document;
  id: string;
  nativeWindow: any;
  display: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentService,
    private router: Router,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.docs = this.docService.getDocument(this.id);
    });
  }
  onEditDocs() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onView() {
    if (this.docs.url) {
      this.nativeWindow.open(this.docs.url);
    }
  }
  onDelete() {
    this.display = true;
    window.setTimeout(() => {
      this.docService.deleteDocumentToBackend(this.docs);
      this.router.navigate(['/documents'], { relativeTo: this.route });
    }, 1000);
  }
}
