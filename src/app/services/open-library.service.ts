import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchRes} from "../models/searchRes";
import {SearchType} from "../models/searchType";
import {SubjectRes} from "../models/subjectRes";

@Injectable()
export class OpenLibraryService {
  baseUrl = 'https://openlibrary.org/'
  constructor(private http: HttpClient) { }

  searchBooks(type: SearchType, q: string, limit?: number) {
    console.log(type)
    let url
    url = new URL('search.json', this.baseUrl)
    if (type === SearchType.TITLE) {
      url.searchParams.append('title', q)
    } else {
      url.searchParams.append('author', q)
    }
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
}
