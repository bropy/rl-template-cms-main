'use client'

import { type FC, useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from '@/client/shared/hooks'

import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { Skeleton } from '@heroui/skeleton'
import { Spinner } from '@heroui/spinner'
import { cn } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'

import { bookSearchQueryOptions, openLibraryApi, type IOpenLibraryBook } from '@/client/entities/api/openlibrary'

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

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    debouncedSearch(value)
  }, [debouncedSearch])

  // Query for book search results
  const { data: searchResults, isLoading, error } = useQuery(
    bookSearchQueryOptions(debouncedQuery, 12, 0)
  )

  const handleBookClick = useCallback((book: IOpenLibraryBook) => {
    // Create slug from book key and navigate to book detail page
    const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
    const slug = openLibraryApi.createSlugFromWorkKey(workKey)
    router.push(`/books/${slug}`)
  }, [router])

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

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8'>
        <h2 className='text-foreground mb-4 text-3xl font-bold'>Search Books</h2>
        <div className='mx-auto max-w-2xl'>
          <Input
            placeholder='Search for books by title, author, or subject...'
            value={searchQuery}
            onValueChange={handleSearchChange}
            size='lg'
            variant='bordered'
            startContent={
              <div className='text-foreground/50'>
                🔍
              </div>
            }
            endContent={
              isLoading && debouncedQuery ? (
                <Spinner size='sm' />
              ) : null
            }
          />
        </div>
      </div>

      {error && (
        <div className='mb-6 rounded-lg bg-danger/10 p-4 text-center'>
          <p className='text-danger'>
            Error searching books: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )}

      {debouncedQuery && searchResults && (
        <div className='mb-6'>
          <p className='text-foreground/70'>
            Found {searchResults.numFound.toLocaleString()} books for "{debouncedQuery}"
          </p>
        </div>
      )}

      {isLoading && debouncedQuery ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <CardBody className='p-0'>
                <Skeleton className='aspect-[3/4] w-full rounded-t-lg' />
                <div className='p-4 space-y-2'>
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
                  <h3 className='text-foreground mb-2 line-clamp-2 text-lg font-semibold'>
                    {book.title}
                  </h3>
                  
                  <p className='text-foreground/60 mb-2 text-sm'>
                    by {formatAuthors(book.author_name)}
                  </p>
                  
                  {book.first_publish_year && (
                    <p className='text-foreground/50 mb-2 text-xs'>
                      First published: {book.first_publish_year}
                    </p>
                  )}
                  
                  {book.subject && book.subject.length > 0 && (
                    <div className='mb-3'>
                      <p className='text-foreground/70 line-clamp-2 text-xs'>
                        {book.subject.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <div className='flex items-center justify-between'>
                    {book.ratings_average && (
                      <div className='flex items-center gap-1'>
                        <span className='text-yellow-500'>★</span>
                        <span className='text-sm font-medium'>
                          {book.ratings_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                    
                    {book.number_of_pages_median && (
                      <span className='text-foreground/50 text-xs'>
                        {book.number_of_pages_median} pages
                      </span>
                    )}
                  </div>
                </div>
              </CardBody>
              
              <CardFooter className='px-4 pb-4 pt-0'>
                <Button 
                  color='primary' 
                  variant='flat' 
                  className='w-full'
                  size='sm'
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : debouncedQuery && searchResults?.docs?.length === 0 ? (
        <div className='py-12 text-center'>
          <div className='text-6xl mb-4'>📚</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>No books found</h3>
          <p className='text-foreground/70'>
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='text-6xl mb-4'>🔍</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>Search for Books</h3>
          <p className='text-foreground/70'>
            Enter a book title, author name, or subject to start searching.
          </p>
        </div>
      )}
    </section>
  )
}

export default BookSearchComponent
