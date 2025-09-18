import { QueryClient } from '@tanstack/react-query'

import { openLibraryKeys } from './openlibrary.query'
import { slugResolverService } from './slug-resolver.service'
import { topBooksService } from './top-books.service'
import { visitedBooksCacheService } from './visited-books-cache.service'

const CACHE_CLEANUP_INTERVAL = 5 * 60 * 1000
const PRELOAD_INTERVAL = 10 * 60 * 1000

export interface CacheStats {
  topBooks: {
    hasCache: boolean
    cacheAge: number
    cacheSize: number
    isStale: boolean
    lastPreloadTime: string
    revalidationInterval: number
  }
  visitedBooks: {
    totalBooks: number
    recentBooks: number
    totalVisits: number
    oldestVisit: number
    newestVisit: number
    cacheSize: number
    cacheDuration: number
    revalidationInterval: number
  }
  queryClient: {
    queryCount: number
    mutationCount: number
    defaultOptions: any
  }
}

export const cacheManagerService = {
  initialize: async (queryClient: QueryClient): Promise<void> => {
    try {
      visitedBooksCacheService.initializeCache()

      slugResolverService.initializeSlugMappings()

      await topBooksService.preloadTopBooks(queryClient)

      const topBooks = topBooksService.getCachedTopBooks()
      if (topBooks.length > 0) {
        slugResolverService.preloadSlugMappings(topBooks)
      }

      await visitedBooksCacheService.preloadVisitedBooks(queryClient)

      cacheManagerService.startCacheMaintenance(queryClient)
    } catch (error) {
      // Silent fail
    }
  },

  startCacheMaintenance: (queryClient: QueryClient): void => {
    const cleanupInterval = setInterval(() => {
      visitedBooksCacheService.cleanupExpiredEntries()
      slugResolverService.cleanupExpiredSlugMappings()
      cacheManagerService.cleanupStaleQueries(queryClient)
    }, CACHE_CLEANUP_INTERVAL)

    const preloadInterval = setInterval(async () => {
      try {
        await topBooksService.preloadTopBooks(queryClient)
        await visitedBooksCacheService.preloadVisitedBooks(queryClient)
      } catch (error) {
        console.warn('⚠️ Periodic preload failed:', error)
      }
    }, PRELOAD_INTERVAL)

    if (typeof window !== 'undefined') {
      ;(window as any).__cacheCleanupInterval = cleanupInterval
      ;(window as any).__cachePreloadInterval = preloadInterval
    }
  },

  stopCacheMaintenance: (): void => {
    if (typeof window !== 'undefined') {
      const cleanupInterval = (window as any).__cacheCleanupInterval
      const preloadInterval = (window as any).__cachePreloadInterval

      if (cleanupInterval) {
        clearInterval(cleanupInterval)
        delete (window as any).__cacheCleanupInterval
      }

      if (preloadInterval) {
        clearInterval(preloadInterval)
        delete (window as any).__cachePreloadInterval
      }
    }
  },

  cleanupStaleQueries: (queryClient: QueryClient): void => {
    const queryCache = queryClient.getQueryCache()
    const queries = queryCache.getAll()
    let cleanedCount = 0

    queries.forEach((query) => {
      const lastUpdated = query.state.dataUpdatedAt
      const oneHourAgo = Date.now() - 60 * 60 * 1000

      if (lastUpdated < oneHourAgo && !query.getObserversCount()) {
        queryCache.remove(query)
        cleanedCount++
      }
    })

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} stale queries from React Query cache`)
    }
  },

  preloadAndCacheBook: async (workKey: string, slug: string, queryClient: QueryClient): Promise<void> => {
    try {
      console.log(`📚 Preloading and caching book: ${workKey}`)

      await visitedBooksCacheService.addVisitedBook(workKey, slug, queryClient)

      console.log(`✅ Book cached successfully: ${workKey}`)
    } catch (error) {
      console.error(`❌ Failed to preload and cache book: ${workKey}`, error)
    }
  },

  getCacheStats: (queryClient: QueryClient): CacheStats => {
    const queryCache = queryClient.getQueryCache()
    const mutationCache = queryClient.getMutationCache()

    return {
      topBooks: topBooksService.getCacheInfo(),
      visitedBooks: visitedBooksCacheService.getCacheStats(),
      queryClient: {
        queryCount: queryCache.getAll().length,
        mutationCount: mutationCache.getAll().length,
        defaultOptions: queryClient.getDefaultOptions(),
      },
    }
  },

  refreshAllCaches: async (queryClient: QueryClient): Promise<void> => {
    try {
      await topBooksService.refreshCache()

      queryClient.invalidateQueries({
        queryKey: openLibraryKeys.all,
      })

      await topBooksService.preloadTopBooks(queryClient)
      await visitedBooksCacheService.preloadVisitedBooks(queryClient)
    } catch (error) {
      console.error('❌ Failed to refresh all caches:', error)
      throw error
    }
  },

  clearAllCaches: (queryClient: QueryClient): void => {
    console.log('🗑️ Clearing all caches')

    visitedBooksCacheService.clearCache()

    queryClient.clear()

    console.log('✅ All caches cleared')
  },

  getCacheHealth: (
    queryClient: QueryClient,
  ): {
    status: 'healthy' | 'warning' | 'critical'
    issues: string[]
    recommendations: string[]
  } => {
    const stats = cacheManagerService.getCacheStats(queryClient)
    const issues: string[] = []
    const recommendations: string[] = []

    if (!stats.topBooks.hasCache) {
      issues.push('Top books cache is empty')
      recommendations.push('Initialize top books preloading')
    } else if (stats.topBooks.isStale) {
      issues.push('Top books cache is stale')
      recommendations.push('Refresh top books cache')
    }

    if (stats.visitedBooks.totalBooks === 0) {
      issues.push('No visited books in cache')
    } else if (stats.visitedBooks.totalBooks > stats.visitedBooks.cacheSize * 0.9) {
      issues.push('Visited books cache is nearly full')
      recommendations.push('Consider increasing cache size or cleanup frequency')
    }

    if (stats.queryClient.queryCount > 1000) {
      issues.push('React Query cache has too many queries')
      recommendations.push('Increase cleanup frequency or reduce cache time')
    }

    let status: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (issues.length > 0) {
      status = issues.length > 2 ? 'critical' : 'warning'
    }

    return { status, issues, recommendations }
  },
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cacheManagerService.stopCacheMaintenance()
  })
}
