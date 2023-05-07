import {Component} from '@angular/core';
import {OpenLibraryService} from "../../services/open-library.service";
import {BookPreview} from "../../models/book";
import {SearchType} from "../../models/searchType";
import {transformSubjectRes} from "../../utils/transformSubjectRes";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

interface SearchTypeForForm {
  value: string
  name: string
}

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent {
  constructor(
    private openLibraryService: OpenLibraryService) {
    this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.onSearchChange())
  }

  bookList: BookPreview[] = []
  loading = false
  search = ''
  searchUpdate = new Subject<string>()
  types: SearchTypeForForm[] = [{value: 'title', name: "Title",}, {value: 'author', name: "Author"}, {value: 'subject', name: "Subject"}]
  type = SearchType.TITLE

  onSearchChange() {
    if (this.search) {
      this.getBooks(this.type, this.search, 20)
    }
  }

  getBooks(type: SearchType, q: string, limit?: number) {
    this.loading = true
    if (type === SearchType.SUBJECT) {
      this.openLibraryService.searchBooksBySubject(q, limit).subscribe(data => {
        this.bookList = data.works.map(transformSubjectRes)
        this.loading = false
      })
    } else {
      this.openLibraryService.searchBooks(type, q, limit).subscribe(data => {
        this.bookList = data.docs
        this.loading = false
      })
    }
  }

}
