export interface BookPreview {
  key: string
  title: string
  first_publish_year: number
  author_name?: string[]
  cover_i: number
}

export interface BookFromSubjectRes {
  key: string
  title: string
  first_publish_year: number
  authors?: {
    key: string
    name: string
  }[]
  cover_id: number
}
