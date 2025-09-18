'use client'

import { type FC, useCallback, useState } from 'react'
import Image from 'next/image'

import { useRouter } from '@/pkg/libraries/locale'

import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { cn } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'
import { Spinner } from '@heroui/spinner'
import { useQuery } from '@tanstack/react-query'

import { bookSearchQueryOptions, type IOpenLibraryBook, openLibraryApi } from '@/client/entities/api/openlibrary'
import { useDebouncedCallback } from '@/client/shared/hooks'

// interface
interface IProps {
  className?: string
}

// component
const BookSearchComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce search input to avoid too many API calls
  const debouncedSearch = useDebouncedCallback((query: string) => {
    setDebouncedQuery(query)
  }, 500)

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  // Query for book search results
  const { data: searchResults, isLoading, error } = useQuery(bookSearchQueryOptions(debouncedQuery, 12, 0))

  const handleBookClick = useCallback(
    (book: IOpenLibraryBook) => {
      // Create slug from book title and navigate to book detail page
      const slug = openLibraryApi.createBookSlug(book)
      router.push(`/books/${slug}`)
    },
    [router],
  )

  const getCoverImage = useCallback((book: IOpenLibraryBook) => {
    if (book.cover_i) {
      return openLibraryApi.getCoverUrl(book.cover_i, 'M')
    }
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop'
  }, [])

  const formatAuthors = useCallback((authors: string[] | undefined) => {
    if (!authors || authors.length === 0) return 'Unknown Author'
    if (authors.length === 1) return authors[0]
    if (authors.length === 2) return authors.join(' & ')
    return `${authors[0]} & ${authors.length - 1} others`
  }, [])

  const getBookSlug = useCallback((book: IOpenLibraryBook) => {
    return openLibraryApi.createBookSlug(book)
  }, [])

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-4 text-center'>
            <h2 className='text-foreground mb-2 text-2xl font-bold'>Find Your Next Great Read</h2>
          </div>
          
          <div className='relative'>
            <Input
              placeholder='Try "Harry Potter", "Stephen King", or "mystery novels"...'
              value={searchQuery}
              onValueChange={handleSearchChange}
              size='lg'
              variant='bordered'
              classNames={{
                base: 'w-full',
                mainWrapper: 'h-full',
                input: 'text-lg pl-12',
                inputWrapper: 'h-14 bg-white border-2 border-default-300 hover:border-primary focus-within:!border-primary shadow-sm',
              }}
              startContent={
                <div className='flex items-center pl-1'>
                  <div className='text-foreground/60 text-xl'>🔍</div>
                </div>
              }
              endContent={isLoading && debouncedQuery ? <Spinner size='sm' /> : null}
            />
            
            <div className='mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-foreground/60'>
              <span>Popular searches:</span>
              <button 
                className='rounded-full bg-default-100 px-3 py-1 text-xs transition-colors hover:bg-default-200'
                onClick={() => handleSearchChange('javascript programming')}
              >
                JavaScript
              </button>
              <button 
                className='rounded-full bg-default-100 px-3 py-1 text-xs transition-colors hover:bg-default-200'
                onClick={() => handleSearchChange('fiction bestseller')}
              >
                Fiction
              </button>
              <button 
                className='rounded-full bg-default-100 px-3 py-1 text-xs transition-colors hover:bg-default-200'
                onClick={() => handleSearchChange('science fiction')}
              >
                Sci-Fi
              </button>
              <button 
                className='rounded-full bg-default-100 px-3 py-1 text-xs transition-colors hover:bg-default-200'
                onClick={() => handleSearchChange('mystery thriller')}
              >
                Mystery
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className='bg-danger/10 mb-6 rounded-lg p-4 text-center'>
          <p className='text-danger mb-2 font-semibold'>
            Error searching books: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <details className='text-left text-xs text-danger/80'>
            <summary className='cursor-pointer'>View technical details</summary>
            <pre className='mt-2 whitespace-pre-wrap'>
              {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {debouncedQuery && searchResults && (
        <div className='mb-6'>
          <p className='text-foreground/70'>
            Found {searchResults.numFound.toLocaleString()} books for &quot;{debouncedQuery}&quot;
          </p>
        </div>
      )}

      {isLoading && debouncedQuery ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <CardBody className='p-0'>
                <Skeleton className='aspect-[3/4] w-full rounded-t-lg' />
                <div className='space-y-2 p-4'>
                  <Skeleton className='h-4 w-3/4 rounded' />
                  <Skeleton className='h-3 w-1/2 rounded' />
                  <Skeleton className='h-3 w-full rounded' />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : searchResults?.docs && searchResults.docs.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {searchResults.docs.map((book) => (
            <Card
              key={book.key}
              className='group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              isPressable
              onPress={() => handleBookClick(book)}
            >
              <CardBody className='p-0'>
                <div className='relative aspect-[3/4] overflow-hidden rounded-t-lg'>
                  <Image
                    src={getCoverImage(book)}
                    alt={book.title}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>

                <div className='p-4'>
                  <h3 className='text-foreground mb-2 line-clamp-2 text-lg font-semibold'>{book.title}</h3>

                  <p className='text-foreground/60 mb-2 text-sm'>by {formatAuthors(book.author_name)}</p>

                  {book.first_publish_year && (
                    <p className='text-foreground/50 mb-2 text-xs'>First published: {book.first_publish_year}</p>
                  )}

                  {book.subject && book.subject.length > 0 && (
                    <div className='mb-3'>
                      <p className='text-foreground/70 line-clamp-2 text-xs'>{book.subject.slice(0, 3).join(', ')}</p>
                    </div>
                  )}

                  <div className='mb-3'>
                    <p className='bg-default-100 rounded px-2 py-1 font-mono text-xs text-foreground/50'>
                      Slug: {getBookSlug(book)}
                    </p>
                  </div>

                  <div className='flex items-center justify-between'>
                    {book.ratings_average && (
                      <div className='flex items-center gap-1'>
                        <span className='text-yellow-500'>★</span>
                        <span className='text-sm font-medium'>{book.ratings_average.toFixed(1)}</span>
                      </div>
                    )}

                    {book.number_of_pages_median && (
                      <span className='text-foreground/50 text-xs'>{book.number_of_pages_median} pages</span>
                    )}
                  </div>
                </div>
              </CardBody>

              <CardFooter className='px-4 pt-0 pb-4'>
                <Button color='primary' variant='flat' className='w-full' size='sm'>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : debouncedQuery && searchResults?.docs?.length === 0 ? (
        <div className='py-12 text-center'>
          <div className='mb-4 text-6xl'>📚</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>No books found</h3>
          <p className='text-foreground/70'>Try searching with different keywords or check your spelling.</p>
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='mb-4 text-6xl'>🔍</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>Search for Books</h3>
          <p className='text-foreground/70'>Enter a book title, author name, or subject to start searching.</p>
        </div>
      )}
    </section>
  )
}

export default BookSearchComponent
