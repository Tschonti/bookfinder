import {Component, OnInit} from '@angular/core';
import {OpenLibraryService} from "../../services/open-library.service";
import {BookPreview} from "../../models/book";
import {SearchType} from "../../models/searchType";
import {transformSubjectRes} from "../../utils/transformSubjectRes";

interface SearchTypeForForm {
  value: string
  name: string
}

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  constructor(
    private openLibraryService: OpenLibraryService) {}

  bookList: BookPreview[] = []
  search = ''
  types: SearchTypeForForm[] = [{value: 'title', name: "Title",}, {value: 'author', name: "Author"}, {value: 'subject', name: "Subject"}]
  type = SearchType.TITLE

  ngOnInit() {
  }

  onSearchChange() {
    if (this.search) {
      this.getBooks(this.type, this.search, 20)
    }
  }

  getBooks(type: SearchType, q: string, limit?: number) {
    if (type === SearchType.SUBJECT) {
      this.openLibraryService.searchBooksBySubject(q, limit).subscribe(data => this.bookList = data.works.map(transformSubjectRes))
    } else {
      this.openLibraryService.searchBooks(type, q, limit).subscribe(data => this.bookList = data.docs)
    }
  }

}
