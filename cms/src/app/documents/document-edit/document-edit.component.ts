import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  documentForm: FormGroup;
  originalDocument: Document;
  editMode: boolean = false;
  id_Document: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_Document = params['id'];
      if (!params['id']) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
      this.originalDocument = this.documentService.getDocument(
        this.id_Document
      );
      this.initForm();
    });
  }
  initForm() {
    let docTitle = '';
    let docDescription = '';
    let docUrl = '';

    if (this.editMode) {
      const document = this.documentService.getDocument(this.id_Document);
      docTitle = document.name;
      docDescription = document.description;
      docUrl = document.url;
    }

    this.documentForm = new FormGroup({
      name: new FormControl(docTitle, Validators.required),
      description: new FormControl(docDescription),
      url: new FormControl(docUrl, Validators.required),
    });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  documentSubmit() {
    const doc_title = this.documentForm.value['name'];
    const doc_description = this.documentForm.value['description'];
    const doc_url = this.documentForm.value['url'];
    const id = this.documentService.getMaxId();

    const new_Document = new Document(
      null,
      doc_title,
      doc_description,
      doc_url
    );
    if (this.editMode) {
      this.documentService.updateDocumentToBackend(
        this.originalDocument,
        new_Document
      );
    } else {
      this.documentService.addDocumentToBackend(new_Document);
    }
    console.log(this.documentForm);
    console.log(id);
    this.onCancel();
  }
}
