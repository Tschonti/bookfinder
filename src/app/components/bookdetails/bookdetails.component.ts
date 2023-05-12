import {Component, OnInit} from '@angular/core';
import {BookDetails} from "../../models/book";
import {OpenLibraryService} from "../../services/open-library.service";
import {ActivatedRoute} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  /**
   * Constructor parameters for Dependency Injection
   * @param openLibraryService Service to send http request to OpenLibrary
   * @param route Service to navigate through the app.
   * @param _snackBar Service to show notifications as feedback for the user's actions
   */
  constructor(private openLibraryService: OpenLibraryService,
              private route: ActivatedRoute, private _snackBar: MatSnackBar) {}
  isbn = ''
  book: BookDetails | undefined
  favourite: boolean = false
  favourites: BookDetails[] = []
  loading = true

  /**
   * Gets the data of the book identified by the ISBN in the URL and only keeps the first five subjects.
   * Gets the favourite book list from localStorage, and decides whether this book is in it.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isbn = params["isbn"];
      this.openLibraryService.getBook(this.isbn).subscribe(data => {
        // @ts-ignore
        const {subjects, ...book}: BookDetails = data[`ISBN:${this.isbn}`]
        this.book = {...book, subjects: subjects.filter((_s, i) => i < 5)}
        this.favourites = JSON.parse(localStorage.getItem('favs') || '[]')
        this.favourite = this.favourites.some(b => b.key === this.book?.key)
        this.loading = false
      })
    })
  }

  /**
   * Toggles whether this book is in the favourites list. Changes the local variable and updates the array stored in localStorage.
   * Sends a snack message as feedback of the change.
   */
  toggleFavourite() {
    if (this.book) {
      this.favourite = !this.favourite

      if (this.favourite) {
        this.favourites.push({...this.book, isbn: this.isbn})
        this._snackBar.open('Book added to favourites!', '', {duration: 2000})
      } else {
        this.favourites = this.favourites.filter(b => b.key !== this.book?.key)
        this._snackBar.open('Book removed from favourites!','', {duration: 2000})
      }
      localStorage.setItem('favs', JSON.stringify(this.favourites))
    }
  }
}
