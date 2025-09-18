// Open Library API service based on https://openlibrary.org/developers/api

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

// User-Agent header as recommended by Open Library
const USER_AGENT = 'LibraryApp/1.0 (contact@example.com)'

const defaultHeaders = {
  'User-Agent': USER_AGENT,
  'Content-Type': 'application/json',
}

export const openLibraryApi = {
  // Search for books
  searchBooks: async (query: string, limit: number = 20, offset: number = 0): Promise<IBookSearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      fields: 'key,title,author_name,author_key,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,ratings_average,ratings_count'
    })

    const response = await fetch(`${SEARCH_URL}.json?${params}`, {
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`Book search failed: ${response.statusText}`)
    }

    return response.json()
  },

  // Search for authors
  searchAuthors: async (query: string, limit: number = 20, offset: number = 0): Promise<IAuthorSearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      fields: 'key,name,birth_date,death_date,bio,work_count,top_work,top_subjects'
    })

    const response = await fetch(`${SEARCH_URL}/authors.json?${params}`, {
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`Author search failed: ${response.statusText}`)
    }

    return response.json()
  },

  // Get a specific work by key
  getWork: async (workKey: string): Promise<IOpenLibraryWork> => {
    const response = await fetch(`${BASE_URL}${workKey}.json`, {
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`Work fetch failed: ${response.statusText}`)
    }

    return response.json()
  },

  // Get author's works
  getAuthorWorks: async (authorKey: string, limit: number = 50, offset: number = 0): Promise<IAuthorWorksResponse> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    })

    const response = await fetch(`${BASE_URL}${authorKey}/works.json?${params}`, {
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`Author works fetch failed: ${response.statusText}`)
    }

    return response.json()
  },

  // Get author details
  getAuthor: async (authorKey: string): Promise<IOpenLibraryAuthor> => {
    const response = await fetch(`${BASE_URL}${authorKey}.json`, {
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`Author fetch failed: ${response.statusText}`)
    }

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

  // Create slug from work key for routing
  createSlugFromWorkKey: (workKey: string): string => {
    // Remove the "/works/" prefix and return the ID
    return workKey.replace('/works/', '')
  },

  // Create slug from author key for routing
  createSlugFromAuthorKey: (authorKey: string): string => {
    // Remove the "/authors/" prefix and return the ID
    return authorKey.replace('/authors/', '')
  }
}
