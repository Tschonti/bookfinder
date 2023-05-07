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

  /**
   * Sends an HTTP request to OpenLibrary's search API and returns an observable as a result
   * @param type  What kind of search, should not be subject, use the searchBooksBySubject method for that.
   * @param q     Search term
   * @param limit Maximum how many records should be returned
   */
  searchBooks(type: SearchType, q: string, limit?: number) {
    const url = new URL('search.json', this.baseUrl)
    url.searchParams.append(type === SearchType.TITLE ? 'title' : 'author', q)
    if (limit) {
      url.searchParams.append('limit', String(limit))
    }
    return this.http.get<SearchRes>(url.toString())
  }

  /**
   * Sends an HTTP request to OpenLibrary's subject API and returns an observable as a result
   * @param q     Search term
   * @param limit Maximum how many records should be returned
   */
  searchBooksBySubject(q: string, limit?: number) {
    const url = new URL(`subjects/${q}.json`, this.baseUrl)
    if (limit) {
      url.searchParams.append('limit', String(limit))
    }
    return this.http.get<SubjectRes>(url.toString())
  }

  /**
   * Sends an HTTP request to OpenLibrary's book API and returns an observable as a result
   * @param isbn id of the requested book
   */
  getBook(isbn: string) {
    const url = new URL('/api/books', this.baseUrl)
    url.searchParams.append('format', 'json')
    url.searchParams.append('jscmd', 'data')
    url.searchParams.append('bibkeys', `ISBN:${isbn}`)
    return this.http.get<Map<string, BookDetails>>(url.toString())
  }
}
