import {BookPreview} from "./book.type";

export interface SearchRes {
  numFound: number
  start: number
  offset: number
  q: string
  docs: BookPreview[]
}
