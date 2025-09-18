import { QueryClient } from '@tanstack/react-query'
import { openLibraryApi, type IOpenLibraryBook } from './openlibrary.api'
import { openLibraryKeys, workQueryOptions } from './openlibrary.query'

// Top book categories to fetch popular books from
const TOP_BOOK_CATEGORIES = [
  'bestseller fiction',
  'science fiction',
  'mystery thriller', 
  'programming',
  'philosophy',
  'biography',
  'romance',
  'fantasy',
  'history',
  'self help'
] as const

export interface TopBook extends IOpenLibraryBook {
  category: string
  preloadedAt: number
}

// Cache for top 10 books
let cachedTopBooks: TopBook[] = []
let lastPreloadTime = 0
const PRELOAD_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const REVALIDATION_INTERVAL = 30 * 1000 // 30 seconds

export const topBooksService = {
  // Get top 10 books with preloading
  getTopBooks: async (): Promise<TopBook[]> => {
    const now = Date.now()
    
    // Return cached data if still fresh
    if (cachedTopBooks.length > 0 && (now - lastPreloadTime) < PRELOAD_CACHE_DURATION) {
      console.log('📚 Returning cached top 10 books', {
        count: cachedTopBooks.length,
        cacheAge: now - lastPreloadTime
      })
      return cachedTopBooks
    }

    console.log('🔄 Fetching fresh top 10 books data')

    try {
      // Fetch books from multiple categories
      const bookPromises = TOP_BOOK_CATEGORIES.slice(0, 5).map(async (category) => {
        try {
          const result = await openLibraryApi.searchBooks(category, 3, 0)
          return result.docs.map(book => ({
            ...book,
            category,
            preloadedAt: now
          }))
        } catch (error) {
          console.warn(`Failed to fetch books for category: ${category}`, error)
          return []
        }
      })

      const bookArrays = await Promise.all(bookPromises)
      const allBooks = bookArrays.flat()

      // Remove duplicates and get top 10 highest rated books
      const uniqueBooks = allBooks.filter((book, index, self) => 
        index === self.findIndex(b => b.key === book.key)
      )

      // Sort by rating, publication year, and availability of cover image
      const topBooks = uniqueBooks
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
      cachedTopBooks = topBooks
      lastPreloadTime = now

      console.log('✅ Top 10 books cached successfully', {
        count: topBooks.length,
        timestamp: new Date(now).toISOString(),
        books: topBooks.map(b => ({ title: b.title, rating: b.ratings_average }))
      })

      return topBooks
    } catch (error) {
      console.error('❌ Failed to fetch top 10 books:', error)
      
      // Return cached data if available, even if stale
      if (cachedTopBooks.length > 0) {
        console.log('📚 Returning stale cached top books due to error')
        return cachedTopBooks
      }
      
      throw error
    }
  },

  // Preload top 10 books into React Query cache
  preloadTopBooks: async (queryClient: QueryClient): Promise<void> => {
    console.log('🚀 Starting preload of top 10 books')
    
    try {
      const topBooks = await topBooksService.getTopBooks()
      
      // Preload each book's detailed data into React Query cache
      const preloadPromises = topBooks.map(async (book) => {
        try {
          const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
          
          // Preload the work data with extended cache time
          await queryClient.prefetchQuery({
            ...workQueryOptions(workKey),
            staleTime: REVALIDATION_INTERVAL, // 30 seconds
            gcTime: 60 * 60 * 1000, // 1 hour - keep preloaded books cached longer
          })
          
          console.log(`✅ Preloaded book: ${book.title}`)
        } catch (error) {
          console.warn(`⚠️ Failed to preload book: ${book.title}`, error)
        }
      })
      
      await Promise.all(preloadPromises)
      console.log('🎉 Successfully preloaded all top 10 books')
      
    } catch (error) {
      console.error('❌ Failed to preload top books:', error)
    }
  },

  // Force refresh the cache
  refreshCache: async (): Promise<TopBook[]> => {
    console.log('🔄 Force refreshing top books cache')
    lastPreloadTime = 0 // Reset cache time to force refresh
    return await topBooksService.getTopBooks()
  },

  // Get cache info
  getCacheInfo: () => ({
    hasCache: cachedTopBooks.length > 0,
    cacheAge: Date.now() - lastPreloadTime,
    cacheSize: cachedTopBooks.length,
    isStale: (Date.now() - lastPreloadTime) > PRELOAD_CACHE_DURATION,
    lastPreloadTime: new Date(lastPreloadTime).toISOString(),
    revalidationInterval: REVALIDATION_INTERVAL
  }),

  // Get cached books without fetching
  getCachedTopBooks: (): TopBook[] => cachedTopBooks,

  // Check if a book is in the top 10
  isTopBook: (bookKey: string): boolean => {
    return cachedTopBooks.some(book => book.key === bookKey)
  }
}
