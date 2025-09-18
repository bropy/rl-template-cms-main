import { openLibraryApi, type IOpenLibraryBook } from './openlibrary.api'
import { topBooksService } from './top-books.service'
import { visitedBooksCacheService } from './visited-books-cache.service'

// Interface for slug mapping
interface SlugMapping {
  slug: string
  workKey: string
  title: string
  bookKey: string
  cachedAt: number
}

// Cache for slug mappings
let slugMappingsCache: Map<string, SlugMapping> = new Map()
const SLUG_CACHE_DURATION = 60 * 60 * 1000 // 1 hour
const STORAGE_KEY = 'book-slug-mappings'

export const slugResolverService = {
  // Initialize slug mappings from localStorage
  initializeSlugMappings: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedMappings = JSON.parse(stored) as Array<[string, SlugMapping]>
        slugMappingsCache = new Map(parsedMappings)
        
        // Clean up expired entries
        slugResolverService.cleanupExpiredSlugMappings()
        
        console.log('🔗 Slug mappings initialized', {
          count: slugMappingsCache.size
        })
      }
    } catch (error) {
      console.warn('⚠️ Failed to load slug mappings from localStorage:', error)
      slugMappingsCache = new Map()
    }
  },

  // Save slug mappings to localStorage
  saveSlugMappings: () => {
    if (typeof window === 'undefined') return

    try {
      const mappingsArray = Array.from(slugMappingsCache.entries())
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mappingsArray))
    } catch (error) {
      console.warn('⚠️ Failed to save slug mappings to localStorage:', error)
    }
  },

  // Add or update slug mapping
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
    
    console.log(`🔗 Added slug mapping: "${titleSlug}" -> ${workKey}`)
    return titleSlug
  },

  // Resolve slug to work key
  resolveSlugToWorkKey: async (slug: string): Promise<string | null> => {
    slugResolverService.initializeSlugMappings()
    
    // Check cache first
    const cached = slugMappingsCache.get(slug)
    if (cached && (Date.now() - cached.cachedAt) < SLUG_CACHE_DURATION) {
      console.log(`🎯 Slug resolved from cache: "${slug}" -> ${cached.workKey}`)
      return cached.workKey
    }
    
    // Check if it's a legacy work key format (fallback)
    if (slug.match(/^OL\d+W$/)) {
      console.log(`🔄 Legacy work key format detected: ${slug}`)
      return `/works/${slug}`
    }
    
    // Try to find in top books cache
    const topBooks = topBooksService.getCachedTopBooks()
    for (const book of topBooks) {
      const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
      if (titleSlug === slug) {
        const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
        slugResolverService.addSlugMapping(book)
        console.log(`🔍 Slug resolved from top books: "${slug}" -> ${workKey}`)
        return workKey
      }
    }
    
    // Try to find in visited books cache
    const visitedBooks = visitedBooksCacheService.getVisitedBooks()
    for (const visitedBook of visitedBooks) {
      if (visitedBook.data) {
        const titleSlug = openLibraryApi.createSlugFromTitle(visitedBook.data.title)
        if (titleSlug === slug) {
          console.log(`🔍 Slug resolved from visited books: "${slug}" -> ${visitedBook.workKey}`)
          return visitedBook.workKey
        }
      }
    }
    
    // If not found in cache, try to search for the book by title
    try {
      console.log(`🔍 Searching for book by slug: "${slug}"`)
      const searchTitle = slug.replace(/-/g, ' ')
      const searchResult = await openLibraryApi.searchBooks(searchTitle, 10, 0)
      
      for (const book of searchResult.docs) {
        const titleSlug = openLibraryApi.createSlugFromTitle(book.title)
        if (titleSlug === slug) {
          const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
          slugResolverService.addSlugMapping(book)
          console.log(`🎯 Slug resolved from search: "${slug}" -> ${workKey}`)
          return workKey
        }
      }
    } catch (error) {
      console.error(`❌ Failed to search for book with slug: ${slug}`, error)
    }
    
    console.warn(`⚠️ Could not resolve slug: ${slug}`)
    return null
  },

  // Get slug from work key (reverse lookup)
  getSlugFromWorkKey: (workKey: string): string | null => {
    slugResolverService.initializeSlugMappings()
    
    for (const [slug, mapping] of slugMappingsCache.entries()) {
      if (mapping.workKey === workKey) {
        return slug
      }
    }
    
    return null
  },

  // Clean up expired slug mappings
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
      console.log(`🧹 Cleaned up ${cleanedCount} expired slug mappings`)
      slugResolverService.saveSlugMappings()
    }
  },

  // Preload slug mappings from book list
  preloadSlugMappings: (books: IOpenLibraryBook[]): void => {
    console.log(`🚀 Preloading ${books.length} slug mappings`)
    
    books.forEach(book => {
      slugResolverService.addSlugMapping(book)
    })
    
    console.log(`✅ Preloaded slug mappings for ${books.length} books`)
  },

  // Get all cached slug mappings
  getAllSlugMappings: (): SlugMapping[] => {
    slugResolverService.initializeSlugMappings()
    return Array.from(slugMappingsCache.values())
  },

  // Clear all slug mappings
  clearSlugMappings: () => {
    slugMappingsCache.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    console.log('🗑️ Cleared all slug mappings')
  },

  // Get cache statistics
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

// Auto-cleanup on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    slugResolverService.cleanupExpiredSlugMappings()
  })
}
