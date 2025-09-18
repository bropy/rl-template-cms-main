import { QueryClient } from '@tanstack/react-query'

import type { IOpenLibraryWork } from './openlibrary.api'
import { openLibraryKeys, workQueryOptions } from './openlibrary.query'

// Interface for visited book cache entry
interface VisitedBookCacheEntry {
  workKey: string
  slug: string
  title: string
  visitedAt: number
  lastAccessedAt: number
  accessCount: number
  data?: IOpenLibraryWork
}

// Cache configuration
const VISITED_CACHE_DURATION = 30 * 60 * 1000
const MAX_VISITED_BOOKS = 100
const REVALIDATION_INTERVAL = 30 * 1000
const STORAGE_KEY = 'visited-books-cache'

// In-memory cache for visited books
let visitedBooksCache: Map<string, VisitedBookCacheEntry> = new Map()
let cacheInitialized = false

export const visitedBooksCacheService = {
  // Initialize cache from localStorage
  initializeCache: () => {
    if (cacheInitialized || typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedCache = JSON.parse(stored) as Array<[string, VisitedBookCacheEntry]>
        visitedBooksCache = new Map(parsedCache)

        // Clean up expired entries
        visitedBooksCacheService.cleanupExpiredEntries()

        console.log('📚 Visited books cache initialized', {
          count: visitedBooksCache.size,
          entries: Array.from(visitedBooksCache.keys()),
        })
      }
    } catch (error) {
      console.warn('⚠️ Failed to load visited books cache from localStorage:', error)
      visitedBooksCache = new Map()
    }

    cacheInitialized = true
  },

  // Save cache to localStorage
  saveCache: () => {
    if (typeof window === 'undefined') return

    try {
      const cacheArray = Array.from(visitedBooksCache.entries())
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheArray))
    } catch (error) {
      console.warn('⚠️ Failed to save visited books cache to localStorage:', error)
    }
  },

  // Add a book to the visited cache
  addVisitedBook: async (workKey: string, slug: string, queryClient: QueryClient): Promise<void> => {
    visitedBooksCacheService.initializeCache()

    const now = Date.now()
    const existing = visitedBooksCache.get(workKey)

    if (existing) {
      // Update existing entry
      existing.lastAccessedAt = now
      existing.accessCount += 1
      console.log(`📖 Updated visited book: ${existing.title} (${existing.accessCount} visits)`)
    } else {
      // Create new entry
      const newEntry: VisitedBookCacheEntry = {
        workKey,
        slug,
        title: 'Loading...', // Will be updated when data is available
        visitedAt: now,
        lastAccessedAt: now,
        accessCount: 1,
      }

      visitedBooksCache.set(workKey, newEntry)
      console.log(`📚 Added new visited book: ${workKey}`)

      // Clean up if cache is too large
      if (visitedBooksCache.size > MAX_VISITED_BOOKS) {
        visitedBooksCacheService.cleanupOldEntries()
      }
    }

    // Ensure the book data is cached in React Query with extended cache time
    await queryClient.prefetchQuery({
      ...workQueryOptions(workKey),
      staleTime: REVALIDATION_INTERVAL, // 30 seconds
      gcTime: VISITED_CACHE_DURATION, // 30 minutes for visited books
    })

    // Update the entry with actual book data if available
    const cachedData = queryClient.getQueryData(openLibraryKeys.work(workKey)) as IOpenLibraryWork
    if (cachedData) {
      const entry = visitedBooksCache.get(workKey)
      if (entry) {
        entry.title = cachedData.title
        entry.data = cachedData
      }
    }

    visitedBooksCacheService.saveCache()
  },

  // Check if a book has been visited
  isBookVisited: (workKey: string): boolean => {
    visitedBooksCacheService.initializeCache()
    return visitedBooksCache.has(workKey)
  },

  // Get visited book entry
  getVisitedBook: (workKey: string): VisitedBookCacheEntry | undefined => {
    visitedBooksCacheService.initializeCache()
    return visitedBooksCache.get(workKey)
  },

  // Get all visited books sorted by last accessed
  getVisitedBooks: (): VisitedBookCacheEntry[] => {
    visitedBooksCacheService.initializeCache()
    return Array.from(visitedBooksCache.values()).sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)
  },

  // Get recently visited books (last 10)
  getRecentlyVisitedBooks: (): VisitedBookCacheEntry[] => {
    return visitedBooksCacheService.getVisitedBooks().slice(0, 10)
  },

  // Get most visited books
  getMostVisitedBooks: (limit: number = 10): VisitedBookCacheEntry[] => {
    visitedBooksCacheService.initializeCache()
    return Array.from(visitedBooksCache.values())
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, limit)
  },

  // Clean up expired entries
  cleanupExpiredEntries: () => {
    const now = Date.now()
    let cleanedCount = 0

    for (const [key, entry] of visitedBooksCache.entries()) {
      if (now - entry.lastAccessedAt > VISITED_CACHE_DURATION) {
        visitedBooksCache.delete(key)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired visited books`)
      visitedBooksCacheService.saveCache()
    }
  },

  // Clean up old entries when cache is too large
  cleanupOldEntries: () => {
    const entries = Array.from(visitedBooksCache.entries()).sort(([, a], [, b]) => a.lastAccessedAt - b.lastAccessedAt) // Sort by oldest first

    const toRemove = entries.slice(0, entries.length - MAX_VISITED_BOOKS + 10) // Remove oldest, keep some buffer

    for (const [key] of toRemove) {
      visitedBooksCache.delete(key)
    }

    console.log(`🧹 Cleaned up ${toRemove.length} old visited books (cache size: ${visitedBooksCache.size})`)
    visitedBooksCacheService.saveCache()
  },

  // Preload visited books into React Query cache
  preloadVisitedBooks: async (queryClient: QueryClient): Promise<void> => {
    visitedBooksCacheService.initializeCache()

    const recentBooks = visitedBooksCacheService.getRecentlyVisitedBooks()
    console.log(`🚀 Preloading ${recentBooks.length} recently visited books`)

    const preloadPromises = recentBooks.map(async (entry) => {
      try {
        await queryClient.prefetchQuery({
          ...workQueryOptions(entry.workKey),
          staleTime: REVALIDATION_INTERVAL,
          gcTime: VISITED_CACHE_DURATION,
        })
        console.log(`✅ Preloaded visited book: ${entry.title}`)
      } catch (error) {
        console.warn(`⚠️ Failed to preload visited book: ${entry.title}`, error)
      }
    })

    await Promise.all(preloadPromises)
    console.log('🎉 Successfully preloaded recently visited books')
  },

  // Clear all visited books cache
  clearCache: () => {
    visitedBooksCache.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    console.log('🗑️ Cleared all visited books cache')
  },

  // Get cache statistics
  getCacheStats: () => {
    visitedBooksCacheService.initializeCache()
    const entries = Array.from(visitedBooksCache.values())

    return {
      totalBooks: visitedBooksCache.size,
      recentBooks: visitedBooksCacheService.getRecentlyVisitedBooks().length,
      totalVisits: entries.reduce((sum, entry) => sum + entry.accessCount, 0),
      oldestVisit: entries.length > 0 ? Math.min(...entries.map((e) => e.visitedAt)) : 0,
      newestVisit: entries.length > 0 ? Math.max(...entries.map((e) => e.lastAccessedAt)) : 0,
      cacheSize: MAX_VISITED_BOOKS,
      cacheDuration: VISITED_CACHE_DURATION,
      revalidationInterval: REVALIDATION_INTERVAL,
    }
  },
}

// Auto-cleanup on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    visitedBooksCacheService.cleanupExpiredEntries()
  })
}
