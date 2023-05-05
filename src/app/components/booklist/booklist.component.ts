import {Component, OnInit} from '@angular/core';
import {OpenLibraryService} from "../../services/open-library.service";
import {BookPreview} from "../../models/book.type";

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  constructor(
    private openLibraryService: OpenLibraryService) {}

  bookList: BookPreview[] = []
  ngOnInit() {
    this.openLibraryService.searchBooksByTitle('book', 15).subscribe(data => this.bookList = data.docs)
  }

}
