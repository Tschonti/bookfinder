import {BookFromSubjectRes, BookPreview} from "../models/book";

export const transformSubjectRes = (b: BookFromSubjectRes): BookPreview => ({
  title: b.title,
  key: b.key,
  author_name: b.authors?.map(a => a.name),
  cover_i: b.cover_id,
  first_publish_year: b.first_publish_year
})
