'use client'

import { type FC, type ReactNode, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { cacheManagerService } from '@/client/entities/api/openlibrary/cache-manager.service'
import { topBooksService } from '@/client/entities/api/openlibrary/top-books.service'
import { visitedBooksCacheService } from '@/client/entities/api/openlibrary/visited-books-cache.service'

interface IProps {
  children: ReactNode
}

/**
 * CacheProvider - Initializes and manages all caching systems
 * 
 * Features:
 * - Initializes top 10 books preloading
 * - Sets up visited books cache system
 * - Manages cache cleanup and maintenance
 * - Provides cache health monitoring
 */
const CacheProvider: FC<Readonly<IProps>> = ({ children }) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const initializeCache = async () => {
      try {
        console.log('🚀 CacheProvider: Initializing cache systems')
        
        // Initialize the cache management system
        await cacheManagerService.initialize(queryClient)
        
        console.log('✅ CacheProvider: All cache systems initialized successfully')
        
        // Log initial cache stats
        const stats = cacheManagerService.getCacheStats(queryClient)
        console.log('📊 CacheProvider: Initial cache statistics:', {
          topBooksCount: stats.topBooks.cacheSize,
          visitedBooksCount: stats.visitedBooks.totalBooks,
          queryClientQueries: stats.queryClient.queryCount
        })
        
        // Log cache health
        const health = cacheManagerService.getCacheHealth(queryClient)
        console.log(`🏥 CacheProvider: Cache health status: ${health.status}`, {
          issues: health.issues,
          recommendations: health.recommendations
        })
        
      } catch (error) {
        console.error('❌ CacheProvider: Failed to initialize cache systems:', error)
      }
    }

    // Initialize cache on mount
    initializeCache()

    // Cleanup function to stop cache maintenance when component unmounts
    return () => {
      console.log('🛑 CacheProvider: Cleaning up cache systems')
      cacheManagerService.stopCacheMaintenance()
    }
  }, [queryClient])

  // Global error boundary for cache operations
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('cache') || event.error?.message?.includes('query')) {
        console.error('🚨 CacheProvider: Global cache error detected:', event.error)
        
        // Attempt to recover by clearing problematic caches
        try {
          const health = cacheManagerService.getCacheHealth(queryClient)
          if (health.status === 'critical') {
            console.log('🔄 CacheProvider: Attempting cache recovery...')
            visitedBooksCacheService.cleanupExpiredEntries()
            cacheManagerService.cleanupStaleQueries(queryClient)
          }
        } catch (recoveryError) {
          console.error('❌ CacheProvider: Cache recovery failed:', recoveryError)
        }
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [queryClient])

  return <>{children}</>
}

export default CacheProvider
