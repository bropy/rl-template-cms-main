'use client'

import { type FC, type ReactNode, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { cacheManagerService } from '@/client/entities/api/openlibrary/cache-manager.service'
import { topBooksService } from '@/client/entities/api/openlibrary/top-books.service'
import { visitedBooksCacheService } from '@/client/entities/api/openlibrary/visited-books-cache.service'

interface IProps {
  children: ReactNode
}

const CacheProvider: FC<Readonly<IProps>> = ({ children }) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const initializeCache = async () => {
      try {
        await cacheManagerService.initialize(queryClient)
      } catch (error) {
        console.error('Failed to initialize cache systems:', error)
      }
    }

    initializeCache()

    return () => {
      cacheManagerService.stopCacheMaintenance()
    }
  }, [queryClient])

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('cache') || event.error?.message?.includes('query')) {
        try {
          const health = cacheManagerService.getCacheHealth(queryClient)
          if (health.status === 'critical') {
            visitedBooksCacheService.cleanupExpiredEntries()
            cacheManagerService.cleanupStaleQueries(queryClient)
          }
        } catch (recoveryError) {
          // Silent fail
        }
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [queryClient])

  return <>{children}</>
}

export default CacheProvider
