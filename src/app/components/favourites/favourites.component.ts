import {Component, OnInit} from '@angular/core';
import {BookDetails} from "../../models/book";

interface FavouriteBookDetails extends Omit<BookDetails, 'authors'> {
  authors: string
}

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  ngOnInit(): void {
    this.booklist = (JSON.parse(localStorage.getItem('favs') || '[]') as BookDetails[]).map(b => ({...b, authors: b.authors.map(a => a.name).join(", ")}))
  }
  booklist: FavouriteBookDetails[] = []
}
