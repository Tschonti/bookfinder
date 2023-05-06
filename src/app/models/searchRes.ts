import {BookPreview} from "./book";

export interface SearchRes {
  numFound: number
  start: number
  offset: number
  q: string
  docs: BookPreview[]
}
