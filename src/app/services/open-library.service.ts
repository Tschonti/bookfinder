import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchRes} from "../models/searchRes";
import {SearchType} from "../models/searchType";
import {SubjectRes} from "../models/subjectRes";
import {BookDetails} from "../models/book";

@Injectable()
export class OpenLibraryService {
  baseUrl = 'https://openlibrary.org/'
  constructor(private http: HttpClient) { }

  searchBooks(type: SearchType, q: string, limit?: number) {
    const url = new URL('search.json', this.baseUrl)
    url.searchParams.append(type === SearchType.TITLE ? 'title' : 'author', q)
    if (limit) {
      url.searchParams.append('limit', String(limit))
    }
    return this.http.get<SearchRes>(url.toString())
  }

  searchBooksBySubject(q: string, limit?: number) {
    const url = new URL(`subjects/${q}.json`, this.baseUrl)
    if (limit) {
      url.searchParams.append('limit', String(limit))
    }
    return this.http.get<SubjectRes>(url.toString())
  }

  getBook(isbn: string) {
    const url = new URL('/api/books', this.baseUrl)
    url.searchParams.append('format', 'json')
    url.searchParams.append('jscmd', 'data')
    url.searchParams.append('bibkeys', `ISBN:${isbn}`)
    return this.http.get<Map<string, BookDetails>>(url.toString())
  }
}
