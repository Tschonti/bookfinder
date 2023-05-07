import {BookFromSubjectRes, BookPreview} from "../models/book";

/**
 * The response from the subject and search APIs are a bit different, this helper function transforms an instance of BookFromSubjectRes to an instance of BookPreview
 * @param b Result from the Subject API
 */
export const transformSubjectRes = (b: BookFromSubjectRes): BookPreview => ({
  title: b.title,
  key: b.key,
  author_name: b.authors?.map(a => a.name),
  cover_i: b.cover_id,
  first_publish_year: b.first_publish_year,
  isbn: [b.availability?.isbn]
})
