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
  constructor(private openLibraryService: OpenLibraryService,
              private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

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

  isbn = ''
  book: BookDetails | undefined
  favourite: boolean = false
  favourites: BookDetails[] = []
  loading = true


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
