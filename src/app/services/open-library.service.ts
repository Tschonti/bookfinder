import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchRes} from "../models/search-res.type";

@Injectable()
export class OpenLibraryService {
  baseUrl = 'https://openlibrary.org/'
  constructor(private http: HttpClient) { }

  searchBooksByTitle(title: string, limit?: number) {
    const url = new URL('search.json', this.baseUrl)
    url.searchParams.append('title', title)
    if (limit) {
      url.searchParams.append('limit', String(limit))
    }
    return this.http.get<SearchRes>(url.toString())
  }
}
