'use client'

import { type FC, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@heroui/button'
import { Skeleton } from '@heroui/skeleton'
import { cn } from '@heroui/react'

import { topBooksService, type TopBook, openLibraryApi } from '@/client/entities/api/openlibrary'
import { BookCardComponent } from '@/client/features/library/book-card'

interface IProps {
  className?: string
}

const PopularBooksComponent: FC<Readonly<IProps>> = ({ className }) => {
  const router = useRouter()
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
      console.error('Failed to fetch top books:', err)
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

  const handleBookClick = useCallback((book: TopBook) => {
    const slug = openLibraryApi.createBookSlug(book)
    router.push(`/books/${slug}`)
  }, [router])

  useEffect(() => {
    fetchPopularBooks()

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPopularBooks()
    }, 30 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>📚 Popular Books</h2>
        <p className='text-foreground/60 mb-4 text-lg'>
          Discover the most trending books right now
        </p>
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
        <div className='bg-danger/10 mb-6 rounded-lg border border-danger/20 p-4'>
          <p className='text-danger text-sm'>
            ⚠️ {error}
          </p>
          <Button
            variant='light'
            size='sm'
            color='danger'
            onPress={handleRefresh}
            className='mt-2'
          >
            Try Again
          </Button>
        </div>
      )}

      {isLoading && books.length === 0 ? (
        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex gap-4 rounded-lg border border-divider p-4'>
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
            <div key={book.key} className='group relative'>
              <div className='absolute -top-2 -left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md'>
                {index + 1}
              </div>
              <div 
                className='overflow-hidden rounded-lg border border-divider bg-background p-3 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer'
                onClick={() => handleBookClick(book)}
              >
                <div className='mb-3 aspect-[3/4] overflow-hidden rounded-md'>
                  <img
                    src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'}
                    alt={book.title}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <h3 className='text-foreground mb-1 line-clamp-2 text-sm font-semibold'>
                  {book.title}
                </h3>
                <p className='text-foreground/60 mb-2 line-clamp-1 text-xs'>
                  {book.author_name?.[0] || 'Unknown Author'}
                </p>
                {book.ratings_average && (
                  <div className='flex items-center gap-1 mb-1'>
                    <span className='text-yellow-500 text-xs'>★</span>
                    <span className='text-foreground/70 text-xs'>{book.ratings_average.toFixed(1)}</span>
                  </div>
                )}
                <div className='text-foreground/50 text-xs'>
                  Slug: {openLibraryApi.createBookSlug(book)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='text-6xl mb-4'>📚</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>No popular books available</h3>
          <p className='text-foreground/70 mb-4'>
            We couldn't load the popular books at the moment.
          </p>
          <Button color='primary' onPress={handleRefresh}>
            Try Again
          </Button>
        </div>
      )}
    </section>
  )
}

export default PopularBooksComponent
