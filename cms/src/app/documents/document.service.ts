import { Document } from './document.model';
import { EventEmitter } from '@angular/core';

export class DocumentService {
  public docSelected = new EventEmitter<Document>();
  private document: Document[] = [
    new Document(
      'CIT 260 - Object Oriented Programming',
      'This course covers the fundamentals of both object-oriented programming and data structures. This is accomplished by focusing on object-oriented programming topics heavily through the first two-thirds of the semester, during which time we will highlight one data structure each week. For the last third of the semester, we will turn our focus more directly to data structures and algorithms topics..',
      'https://en.wikipedia.org/wiki/'
    ),
    new Document(
      'CIT 366 - Full Stack Development',
      'Learn How to Develop Modern Web Applications using MEAN Stack',
      'https://en.wikipedia.org/wiki/'
    ),
    new Document(
      'CIT 425 - Data WareHousing',
      'This course provides an introduction to data warehouse design. Topics in  data modeling, database design and database access are reviewed.  Issues in data warehouse planning, design, implementation, and administration are discussed in a seminar format.   The role of data warehouse in supporting Decision Support Systems (DSS) is also reviewed.',
      'https://en.wikipedia.org/wiki/'
    ),

    new Document(
      'CIT 460 - Enterprise Development',
      'Model the design of an N-tier application using the J2EE architecture in UML.Appropriately identify, describe, model and implement at least four design patterns for an N-tier application using the J2EE architecture. Describe the role of each container in the J2EE model, and the functionality and interaction of Servlets, Java Server Pages, Session Beans, Entity Beans and Message Beans.',
      'https://en.wikipedia.org/wiki/'
    ),

    new Document(
      'CIT 495 - Senior Practicum',
      'Work with mentor teacher to improve teaching skills and ability to manage a classroom',
      'https://en.wikipedia.org/wiki/'
    ),
  ];

  getDocument() {
    //   Return a copy of it.
    return this.document.slice();
  }
}
