'use client'

import { type FC, useEffect, useState } from 'react'

import { Button } from '@heroui/button'
import { cn } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'

import { type TopBook, topBooksService } from '@/client/entities/api/openlibrary'
import { BookCardComponent } from '@/client/features/library'

// interface
interface IProps {
  className?: string
}

// component
const PopularBooksComponent: FC<Readonly<IProps>> = ({ className }) => {
  const [books, setBooks] = useState<TopBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPopularBooks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const topBooks = await topBooksService.getTopBooks()
      setBooks(topBooks)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch top books')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setError(null)
      const refreshedBooks = await topBooksService.refreshCache()
      setBooks(refreshedBooks)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh books')
    }
  }

  useEffect(() => {
    fetchPopularBooks()

    const interval = setInterval(() => {
      fetchPopularBooks()
    }, 30 * 1000)

    return () => clearInterval(interval)
  }, [])

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>📚 Popular Books</h2>
        <p className='text-foreground/60 mb-4 text-lg'>Discover the most trending books right now</p>
        <div className='flex items-center justify-center gap-4'>
          <span className='text-foreground/50 text-sm'>
            {lastUpdated && `Updated ${lastUpdated.toLocaleTimeString()}`}
          </span>
          <Button
            variant='light'
            size='sm'
            onPress={handleRefresh}
            isLoading={isLoading}
            className='text-foreground/60'
          >
            🔄 Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className='bg-danger/10 border-danger/20 mb-6 rounded-lg border p-4'>
          <p className='text-danger text-sm'>⚠️ {error}</p>
          <Button variant='light' size='sm' color='danger' onPress={handleRefresh} className='mt-2'>
            Try Again
          </Button>
        </div>
      )}

      {isLoading && books.length === 0 ? (
        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='border-divider flex gap-4 rounded-lg border p-4'>
              <Skeleton className='h-24 w-16 rounded-md' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-3/4 rounded' />
                <Skeleton className='h-3 w-1/2 rounded' />
                <Skeleton className='h-3 w-1/4 rounded' />
              </div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          {books.map((book, index) => (
            <div key={book.key} className='relative'>
              <div className='bg-primary absolute -top-2 -left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-md'>
                {index + 1}
              </div>
              <BookCardComponent book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='mb-4 text-6xl'>📚</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>No popular books available</h3>
          <p className='text-foreground/70 mb-4'>We couldn&apos;t load the popular books at the moment.</p>
          <Button color='primary' onPress={handleRefresh}>
            Try Again
          </Button>
        </div>
      )}
    </section>
  )
}

export default PopularBooksComponent
