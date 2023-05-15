import {Component, OnInit} from '@angular/core';
import {OpenLibraryService} from "../../services/open-library.service";
import {BookPreview} from "../../models/book";
import {SearchType} from "../../models/searchType";
import {transformSubjectRes} from "../../utils/transformSubjectRes";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  /**
   * We don't want to send a request to OpenLibrary on every letter the user types, so we use debounce.
   * If the user hasn't typed anything in the past 400 ms and the search value has changed, then we send the request.
   * This is implemented with rxjs' debounceTime and distinctUntilChanged piped onto the input change event.
   * @param openLibraryService  Service to send http request to OpenLibrary
   * @param route Service to navigate through the app.
   * @param _snackBar Service to show notifications as feedback for the user's actions
   */
  constructor(private openLibraryService: OpenLibraryService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.onSearchChange())
  }

  bookList: BookPreview[] = []
  loading = false
  search = ''
  searchUpdate = new Subject<string>()
  types: SearchTypeForForm[] = [{value: 'title', name: "Title",}, {value: 'author', name: "Author"}, {value: 'subject', name: "Subject"}]
  type = SearchType.TITLE

  /**
   * If there are query params in the url, starts a request to get the requested data and sets the local variables.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
          if (params['q']) {
            this.search = params['q'].replaceAll('_', ' ')
            if (params['type']) {
              this.type = params['type']
            }
            this.getBooks(params['type'] || SearchType.TITLE, params['q'], 20)
          }
      })
  }

  /**
   * Function called by the input field on change. If the input isn't empty, starts a request to get the data.
   */
  onSearchChange() {
    if (this.search) {
      this.getBooks(this.type, this.search, 20)
    }
  }

  /**
   * Calls a method of OpenLibraryService to get the list of books from the API. Subscribes to the results and sets the variables when they arrive.
   * @param type What criteria to search by
   * @param q Search term
   * @param limit Maximum how many records should be returned
   */
  getBooks(type: SearchType, q: string, limit?: number) {
    this.loading = true
    if (type === SearchType.SUBJECT) {
      this.openLibraryService.searchBooksBySubject(q, limit).subscribe({next: data =>
      {
        this.bookList = data.works.map(transformSubjectRes).filter(b => b.isbn[0])
        this.loading = false
      }, error: err => {
        console.error(err)
        this._snackBar.open('Error querying books')
        this.bookList = []
          this.loading = false
      }
    })
    } else {
      this.openLibraryService.searchBooks(type, q, limit).subscribe({next: data =>
      {
        this.bookList = data.docs.filter(b => b.isbn?.length > 0)
        this.loading = false
      }, error: err => {
          console.error(err)
          this._snackBar.open('Error querying books')
          this.bookList = []
          this.loading = false
        }
    })
    }
  }

}
