'use client'

import { type FC, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Chip } from '@heroui/chip'

import { cacheManagerService, type CacheStats } from '@/client/entities/api/openlibrary/cache-manager.service'
import { visitedBooksCacheService } from '@/client/entities/api/openlibrary/visited-books-cache.service'
import { topBooksService } from '@/client/entities/api/openlibrary/top-books.service'

interface IProps {
  className?: string
}

/**
 * CacheDebugComponent - Development tool for monitoring and debugging cache systems
 * 
 * Features:
 * - Real-time cache statistics
 * - Cache health monitoring
 * - Manual cache operations (refresh, clear)
 * - Visited books tracking
 * - Top books preloading status
 */
const CacheDebugComponent: FC<Readonly<IProps>> = ({ className }) => {
  const queryClient = useQueryClient()
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [health, setHealth] = useState<{ status: string; issues: string[]; recommendations: string[] } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Update stats every 5 seconds
  useEffect(() => {
    const updateStats = () => {
      try {
        const currentStats = cacheManagerService.getCacheStats(queryClient)
        const currentHealth = cacheManagerService.getCacheHealth(queryClient)
        setStats(currentStats)
        setHealth(currentHealth)
      } catch (error) {
        console.error('Failed to get cache stats:', error)
      }
    }

    updateStats()
    const interval = setInterval(updateStats, 5000)
    return () => clearInterval(interval)
  }, [queryClient])

  const handleRefreshAll = async () => {
    setIsRefreshing(true)
    try {
      await cacheManagerService.refreshAllCaches(queryClient)
    } catch (error) {
      console.error('Failed to refresh caches:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleClearAll = () => {
    cacheManagerService.clearAllCaches(queryClient)
  }

  const handleRefreshTopBooks = async () => {
    try {
      await topBooksService.refreshCache()
      await topBooksService.preloadTopBooks(queryClient)
    } catch (error) {
      console.error('Failed to refresh top books:', error)
    }
  }

  const handleClearVisitedBooks = () => {
    visitedBooksCacheService.clearCache()
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success'
      case 'warning': return 'warning'
      case 'critical': return 'danger'
      default: return 'default'
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${Math.round(ms / 1000)}s`
    return `${Math.round(ms / 60000)}m`
  }

  if (!stats || !health) {
    return (
      <Card className={className}>
        <CardBody>
          <p>Loading cache statistics...</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Cache Health Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Cache Health</h3>
          <Chip color={getHealthColor(health.status)} variant="flat">
            {health.status.toUpperCase()}
          </Chip>
        </CardHeader>
        <CardBody className="space-y-2">
          {health.issues.length > 0 && (
            <div>
              <p className="text-sm font-medium text-warning">Issues:</p>
              <ul className="text-sm text-foreground-600 ml-4">
                {health.issues.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}
          {health.recommendations.length > 0 && (
            <div>
              <p className="text-sm font-medium text-primary">Recommendations:</p>
              <ul className="text-sm text-foreground-600 ml-4">
                {health.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Top Books Cache */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Top Books Cache</h3>
          <Button size="sm" variant="flat" onPress={handleRefreshTopBooks}>
            Refresh
          </Button>
        </CardHeader>
        <CardBody className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Status:</span>
              <Chip size="sm" color={stats.topBooks.hasCache ? 'success' : 'warning'} variant="flat" className="ml-2">
                {stats.topBooks.hasCache ? 'Active' : 'Empty'}
              </Chip>
            </div>
            <div>
              <span className="font-medium">Books:</span> {stats.topBooks.cacheSize}
            </div>
            <div>
              <span className="font-medium">Cache Age:</span> {formatDuration(stats.topBooks.cacheAge)}
            </div>
            <div>
              <span className="font-medium">Revalidation:</span> {formatDuration(stats.topBooks.revalidationInterval)}
            </div>
          </div>
          <div>
            <span className="font-medium">Last Preload:</span>
            <span className="text-foreground-600 ml-2">{stats.topBooks.lastPreloadTime}</span>
          </div>
        </CardBody>
      </Card>

      {/* Visited Books Cache */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Visited Books Cache</h3>
          <Button size="sm" variant="flat" color="warning" onPress={handleClearVisitedBooks}>
            Clear
          </Button>
        </CardHeader>
        <CardBody className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Books:</span> {stats.visitedBooks.totalBooks}
            </div>
            <div>
              <span className="font-medium">Recent Books:</span> {stats.visitedBooks.recentBooks}
            </div>
            <div>
              <span className="font-medium">Total Visits:</span> {stats.visitedBooks.totalVisits}
            </div>
            <div>
              <span className="font-medium">Cache Duration:</span> {formatDuration(stats.visitedBooks.cacheDuration)}
            </div>
          </div>
          {stats.visitedBooks.oldestVisit > 0 && (
            <div>
              <span className="font-medium">Oldest Visit:</span>
              <span className="text-foreground-600 ml-2">
                {new Date(stats.visitedBooks.oldestVisit).toLocaleString()}
              </span>
            </div>
          )}
          {stats.visitedBooks.newestVisit > 0 && (
            <div>
              <span className="font-medium">Newest Visit:</span>
              <span className="text-foreground-600 ml-2">
                {new Date(stats.visitedBooks.newestVisit).toLocaleString()}
              </span>
            </div>
          )}
        </CardBody>
      </Card>

      {/* React Query Cache */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">React Query Cache</h3>
        </CardHeader>
        <CardBody className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Active Queries:</span> {stats.queryClient.queryCount}
            </div>
            <div>
              <span className="font-medium">Active Mutations:</span> {stats.queryClient.mutationCount}
            </div>
          </div>
        </CardBody>
      </Card>

      <Divider />

      {/* Cache Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Cache Actions</h3>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2 flex-wrap">
            <Button 
              color="primary" 
              onPress={handleRefreshAll} 
              isLoading={isRefreshing}
              disabled={isRefreshing}
            >
              Refresh All Caches
            </Button>
            <Button color="warning" variant="flat" onPress={handleClearAll}>
              Clear All Caches
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Recent Visited Books */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Visited Books</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {visitedBooksCacheService.getRecentlyVisitedBooks().slice(0, 5).map((book, index) => (
              <div key={book.workKey} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{book.title}</span>
                  <span className="text-foreground-600 ml-2">({book.accessCount} visits)</span>
                </div>
                <span className="text-foreground-600">
                  {formatDuration(Date.now() - book.lastAccessedAt)} ago
                </span>
              </div>
            ))}
            {visitedBooksCacheService.getRecentlyVisitedBooks().length === 0 && (
              <p className="text-foreground-600 text-sm">No visited books yet</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default CacheDebugComponent
