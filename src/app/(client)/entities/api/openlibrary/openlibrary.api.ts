export interface IOpenLibraryBook {
  key: string
  title: string
  author_name?: string[]
  author_key?: string[]
  first_publish_year?: number
  isbn?: string[]
  cover_i?: number
  subject?: string[]
  publisher?: string[]
  language?: string[]
  number_of_pages_median?: number
  ratings_average?: number
  ratings_count?: number
}

export interface IOpenLibraryAuthor {
  key: string
  name: string
  birth_date?: string
  death_date?: string
  bio?: string
  work_count?: number
  top_work?: string
  top_subjects?: string[]
}

export interface IOpenLibraryWork {
  key: string
  title: string
  authors?: Array<{
    author: {
      key: string
    }
    type: {
      key: string
    }
  }>
  description?: string | { value: string }
  covers?: number[]
  subject_places?: string[]
  subjects?: string[]
  first_publish_date?: string
}

export interface IBookSearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: IOpenLibraryBook[]
}

export interface IAuthorSearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: IOpenLibraryAuthor[]
}

export interface IAuthorWorksResponse {
  entries: IOpenLibraryWork[]
  size: number
}

const BASE_URL = 'https://openlibrary.org'
const SEARCH_URL = 'https://openlibrary.org/search'

export const openLibraryApi = {
  searchBooks: async (query: string, limit: number = 20, offset: number = 0): Promise<IBookSearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      fields: 'key,title,author_name,author_key,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,ratings_average,ratings_count',
    })

    const response = await fetch(`${SEARCH_URL}.json?${params}`)
    if (!response.ok) throw new Error(`Search failed: ${response.status}`)
    return response.json()
  },

  getWork: async (workKey: string): Promise<IOpenLibraryWork> => {
    const response = await fetch(`${BASE_URL}${workKey}.json`)
    if (!response.ok) throw new Error(`Work fetch failed: ${response.status}`)
    return response.json()
  },

  // Get cover URL by cover ID
  getCoverUrl: (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
  },

  // Extract work key from book key for routing
  getWorkKeyFromBook: (bookKey: string): string => {
    // Book keys are like "/books/OL123456M", work keys are like "/works/OL123456W"
    // This is a simplified conversion - in practice you might need to fetch the book details
    return bookKey.replace('/books/', '/works/').replace('M', 'W')
  },

  // Create slug from book title for routing
  createSlugFromTitle: (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  },

  // Create slug from work key for routing (legacy support)
  createSlugFromWorkKey: (workKey: string): string => {
    // Remove the "/works/" prefix and return the ID
    return workKey.replace('/works/', '')
  },

  // Create book slug from book object
  createBookSlug: (book: { title: string; key: string }): string => {
    // Use title-based slug as primary method
    const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
    // If title slug is empty or too short, fall back to work key
    if (titleSlug.length < 3) {
      const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
      return openLibraryApi.createSlugFromWorkKey(workKey)
    }
    return titleSlug
  },

  // Create slug from author key for routing
  createSlugFromAuthorKey: (authorKey: string): string => {
    // Remove the "/authors/" prefix and return the ID
    return authorKey.replace('/authors/', '')
  },
}
