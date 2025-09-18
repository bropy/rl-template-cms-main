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
  // Search for books
  searchBooks: async (query: string, limit: number = 20, offset: number = 0): Promise<IBookSearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      fields:
        'key,title,author_name,author_key,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,ratings_average,ratings_count',
    })

    const url = `${SEARCH_URL}.json?${params}`

    try {
      const response = await fetch(url)

      console.log('📚 Book search response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Book search failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url,
        })
        throw new Error(`Book search failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Book search success:', {
        numFound: data.numFound,
        resultsCount: data.docs?.length || 0,
      })

      return data
    } catch (error) {
      console.error('💥 Book search error:', error)
      throw error
    }
  },

  // Search for authors
  searchAuthors: async (query: string, limit: number = 20, offset: number = 0): Promise<IAuthorSearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      fields: 'key,name,birth_date,death_date,bio,work_count,top_work,top_subjects',
    })

    const url = `${SEARCH_URL}/authors.json?${params}`
    console.log('👤 Searching authors:', { query, url, note: 'Using minimal headers to avoid CORS issues' })

    try {
      const response = await fetch(url)

      console.log('👥 Author search response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Author search failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url,
        })
        throw new Error(`Author search failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Author search success:', {
        numFound: data.numFound,
        resultsCount: data.docs?.length || 0,
      })

      return data
    } catch (error) {
      console.error('💥 Author search error:', error)
      throw error
    }
  },

  // Get a specific work by key
  getWork: async (workKey: string): Promise<IOpenLibraryWork> => {
    const url = `${BASE_URL}${workKey}.json`
    console.log('📖 Fetching work:', { workKey, url })

    try {
      const response = await fetch(url)

      console.log('📚 Work fetch response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Work fetch failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url,
        })
        throw new Error(`Work fetch failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Work fetch success:', { workKey, title: data.title })

      return data
    } catch (error) {
      console.error('💥 Work fetch error:', error)
      throw error
    }
  },

  // Get author's works
  getAuthorWorks: async (authorKey: string, limit: number = 50, offset: number = 0): Promise<IAuthorWorksResponse> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    })

    const url = `${BASE_URL}${authorKey}/works.json?${params}`
    console.log('📚 Fetching author works:', { authorKey, url })

    try {
      const response = await fetch(url)

      console.log('👤 Author works response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Author works fetch failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url,
        })
        throw new Error(`Author works fetch failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Author works success:', {
        authorKey,
        worksCount: data.entries?.length || 0,
        totalSize: data.size,
      })

      return data
    } catch (error) {
      console.error('💥 Author works error:', error)
      throw error
    }
  },

  // Get author details
  getAuthor: async (authorKey: string): Promise<IOpenLibraryAuthor> => {
    const url = `${BASE_URL}${authorKey}.json`
    console.log('👤 Fetching author:', { authorKey, url })

    try {
      const response = await fetch(url)

      console.log('👥 Author fetch response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Author fetch failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url,
        })
        throw new Error(`Author fetch failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Author fetch success:', { authorKey, name: data.name })

      return data
    } catch (error) {
      console.error('💥 Author fetch error:', error)
      throw error
    }
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
