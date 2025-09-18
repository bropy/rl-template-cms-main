import { openLibraryApi, type IOpenLibraryBook } from './openlibrary.api'

// Popular search terms to get trending books
const POPULAR_QUERIES = [
  'javascript programming',
  'python programming', 
  'fiction bestseller',
  'science fiction',
  'mystery thriller',
  'romance novel',
  'biography',
  'history',
  'philosophy',
  'cooking'
]

export interface PopularBook extends IOpenLibraryBook {
  searchQuery: string
}

// Cache for popular books
let cachedPopularBooks: PopularBook[] = []
let lastCacheTime = 0
const CACHE_DURATION = 30 * 1000 // 30 seconds

export const popularBooksService = {
  // Get popular books with caching
  getPopularBooks: async (): Promise<PopularBook[]> => {
    const now = Date.now()
    
    // Return cached data if still fresh
    if (cachedPopularBooks.length > 0 && (now - lastCacheTime) < CACHE_DURATION) {
      console.log('📚 Returning cached popular books', {
        count: cachedPopularBooks.length,
        cacheAge: now - lastCacheTime
      })
      return cachedPopularBooks
    }

    console.log('🔄 Fetching fresh popular books data')

    try {
      // Fetch books from multiple popular categories
      const bookPromises = POPULAR_QUERIES.slice(0, 5).map(async (query) => {
        try {
          const result = await openLibraryApi.searchBooks(query, 2, 0)
          return result.docs.map(book => ({
            ...book,
            searchQuery: query
          }))
        } catch (error) {
          console.warn(`Failed to fetch books for query: ${query}`, error)
          return []
        }
      })

      const bookArrays = await Promise.all(bookPromises)
      const allBooks = bookArrays.flat()

      // Remove duplicates and get top 10
      const uniqueBooks = allBooks.filter((book, index, self) => 
        index === self.findIndex(b => b.key === book.key)
      )

      // Sort by rating and publication year, take top 10
      const popularBooks = uniqueBooks
        .filter(book => book.cover_i && book.title && book.author_name)
        .sort((a, b) => {
          // Prioritize books with ratings
          if (a.ratings_average && !b.ratings_average) return -1
          if (!a.ratings_average && b.ratings_average) return 1
          if (a.ratings_average && b.ratings_average) {
            return b.ratings_average - a.ratings_average
          }
          // Then by publication year (newer first)
          return (b.first_publish_year || 0) - (a.first_publish_year || 0)
        })
        .slice(0, 10)

      // Update cache
      cachedPopularBooks = popularBooks
      lastCacheTime = now

      console.log('✅ Popular books cached successfully', {
        count: popularBooks.length,
        timestamp: new Date(now).toISOString()
      })

      return popularBooks
    } catch (error) {
      console.error('❌ Failed to fetch popular books:', error)
      
      // Return cached data if available, even if stale
      if (cachedPopularBooks.length > 0) {
        console.log('📚 Returning stale cached data due to error')
        return cachedPopularBooks
      }
      
      throw error
    }
  },

  // Force refresh the cache
  refreshCache: async (): Promise<PopularBook[]> => {
    console.log('🔄 Force refreshing popular books cache')
    lastCacheTime = 0 // Reset cache time to force refresh
    return await popularBooksService.getPopularBooks()
  },

  // Get cache info
  getCacheInfo: () => ({
    hasCache: cachedPopularBooks.length > 0,
    cacheAge: Date.now() - lastCacheTime,
    cacheSize: cachedPopularBooks.length,
    isStale: (Date.now() - lastCacheTime) > CACHE_DURATION
  })
}
