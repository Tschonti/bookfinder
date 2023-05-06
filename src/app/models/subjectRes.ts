import {BookFromSubjectRes} from "./book";

export interface SubjectRes {
  key: string
  name: string
  work_count: string
  works: BookFromSubjectRes[]
}
