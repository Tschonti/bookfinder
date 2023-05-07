export interface BookPreview {
  key: string
  title: string
  first_publish_year: number
  author_name?: string[]
  cover_i: number
  isbn: string[]
}

export interface BookFromSubjectRes {
  key: string
  title: string
  first_publish_year: number
  authors?: {
    key: string
    name: string
  }[]
  availability: {
    isbn: string
  }
  cover_id: number
}

export interface BookDetails {
  url: string
  key: string
  title: string
  subtitle: string
  isbn: string
  authors: {
    url: string
    name: string
  }[]
  publish_date: string
  subjects: {
    url: string
    name: string
  }[]
  cover: {
    small: string
    medium: string
    large: string
  }
}
