import { openLibraryApi, type IOpenLibraryBook } from './openlibrary.api'
import { topBooksService } from './top-books.service'
import { visitedBooksCacheService } from './visited-books-cache.service'

interface SlugMapping {
  slug: string
  workKey: string
  title: string
  bookKey: string
  cachedAt: number
}

let slugMappingsCache: Map<string, SlugMapping> = new Map()
const SLUG_CACHE_DURATION = 60 * 60 * 1000
const STORAGE_KEY = 'book-slug-mappings'

export const slugResolverService = {
  initializeSlugMappings: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedMappings = JSON.parse(stored) as Array<[string, SlugMapping]>
        slugMappingsCache = new Map(parsedMappings)
        slugResolverService.cleanupExpiredSlugMappings()
      }
    } catch (error) {
      slugMappingsCache = new Map()
    }
  },

  saveSlugMappings: () => {
    if (typeof window === 'undefined') return

    try {
      const mappingsArray = Array.from(slugMappingsCache.entries())
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mappingsArray))
    } catch (error) {
      // Silent fail
    }
  },

  addSlugMapping: (book: IOpenLibraryBook): string => {
    const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
    const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
    
    const mapping: SlugMapping = {
      slug: titleSlug,
      workKey,
      title: book.title,
      bookKey: book.key,
      cachedAt: Date.now()
    }
    
    slugMappingsCache.set(titleSlug, mapping)
    slugResolverService.saveSlugMappings()
    return titleSlug
  },

  resolveSlugToWorkKey: async (slug: string): Promise<string | null> => {
    slugResolverService.initializeSlugMappings()
    
    const cached = slugMappingsCache.get(slug)
    if (cached && (Date.now() - cached.cachedAt) < SLUG_CACHE_DURATION) {
      return cached.workKey
    }
    
    if (slug.match(/^OL\d+W$/)) {
      return `/works/${slug}`
    }
    
    const topBooks = topBooksService.getCachedTopBooks()
    for (const book of topBooks) {
      const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
      if (titleSlug === slug) {
        const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
        slugResolverService.addSlugMapping(book)
        return workKey
      }
    }
    
    const visitedBooks = visitedBooksCacheService.getVisitedBooks()
    for (const visitedBook of visitedBooks) {
      if (visitedBook.data) {
        const titleSlug = openLibraryApi.createSlugFromTitle(visitedBook.data.title)
        if (titleSlug === slug) {
          return visitedBook.workKey
        }
      }
    }
    
    try {
      const searchTitle = slug.replace(/-/g, ' ')
      const searchResult = await openLibraryApi.searchBooks(searchTitle, 10, 0)
      
      for (const book of searchResult.docs) {
        const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
        if (titleSlug === slug) {
          const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
          slugResolverService.addSlugMapping(book)
          return workKey
        }
      }
    } catch (error) {
      // Silent fail
    }
    
    return null
  },

  getSlugFromWorkKey: (workKey: string): string | null => {
    slugResolverService.initializeSlugMappings()
    
    for (const [slug, mapping] of slugMappingsCache.entries()) {
      if (mapping.workKey === workKey) {
        return slug
      }
    }
    
    return null
  },

  cleanupExpiredSlugMappings: () => {
    const now = Date.now()
    let cleanedCount = 0
    
    for (const [slug, mapping] of slugMappingsCache.entries()) {
      if (now - mapping.cachedAt > SLUG_CACHE_DURATION) {
        slugMappingsCache.delete(slug)
        cleanedCount++
      }
    }
    
    if (cleanedCount > 0) {
      slugResolverService.saveSlugMappings()
    }
  },

  preloadSlugMappings: (books: IOpenLibraryBook[]): void => {
    books.forEach(book => {
      slugResolverService.addSlugMapping(book)
    })
  },

  getAllSlugMappings: (): SlugMapping[] => {
    slugResolverService.initializeSlugMappings()
    return Array.from(slugMappingsCache.values())
  },

  clearSlugMappings: () => {
    slugMappingsCache.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  },

  getSlugCacheStats: () => {
    slugResolverService.initializeSlugMappings()
    const mappings = Array.from(slugMappingsCache.values())
    
    return {
      totalMappings: slugMappingsCache.size,
      oldestMapping: mappings.length > 0 ? Math.min(...mappings.map(m => m.cachedAt)) : 0,
      newestMapping: mappings.length > 0 ? Math.max(...mappings.map(m => m.cachedAt)) : 0,
      cacheDuration: SLUG_CACHE_DURATION
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    slugResolverService.cleanupExpiredSlugMappings()
  })
}
