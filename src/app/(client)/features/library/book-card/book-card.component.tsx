'use client'

import { type FC, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from '@/pkg/libraries/locale'

import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { cn } from '@heroui/react'

import { openLibraryApi, type IOpenLibraryBook } from '@/client/entities/api/openlibrary'
import { useLikedBooksStore } from '@/client/shared/store'

interface IProps {
  book: IOpenLibraryBook
  className?: string
  compact?: boolean
}

const BookCardComponent: FC<Readonly<IProps>> = ({ book, className, compact = false }) => {
  const router = useRouter()
  const { isLiked, toggleLike } = useLikedBooksStore()

  const handleBookClick = useCallback(() => {
    const workKey = openLibraryApi.getWorkKeyFromBook(book.key)
    const slug = openLibraryApi.createSlugFromWorkKey(workKey)
    router.push(`/books/${slug}`)
  }, [router, book.key])

  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLike(book)
  }, [toggleLike, book])

  const getCoverImage = useCallback(() => {
    if (book.cover_i) {
      return openLibraryApi.getCoverUrl(book.cover_i, compact ? 'S' : 'M')
    }
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop'
  }, [book.cover_i, compact])

  const formatAuthors = useCallback(() => {
    if (!book.author_name || book.author_name.length === 0) return 'Unknown Author'
    if (book.author_name.length === 1) return book.author_name[0]
    if (book.author_name.length === 2) return book.author_name.join(' & ')
    return `${book.author_name[0]} & ${book.author_name.length - 1} others`
  }, [book.author_name])

  const liked = isLiked(book.key)

  if (compact) {
    return (
      <Card 
        className={cn(
          'group cursor-pointer transition-all duration-200 hover:shadow-md border-1 border-divider',
          className
        )}
        isPressable
        onPress={handleBookClick}
      >
        <CardBody className='p-3'>
          <div className='flex gap-3'>
            {/* Small cover */}
            <div className='relative h-16 w-12 shrink-0 overflow-hidden rounded'>
              <Image
                src={getCoverImage()}
                alt={book.title}
                fill
                sizes='48px'
                className='object-cover'
              />
            </div>
            
            {/* Content */}
            <div className='min-w-0 flex-1'>
              <h3 className='text-foreground mb-1 line-clamp-1 text-sm font-medium'>
                {book.title}
              </h3>
              <p className='text-foreground/60 mb-2 line-clamp-1 text-xs'>
                {formatAuthors()}
              </p>
              
              <div className='flex items-center justify-between'>
                {book.first_publish_year && (
                  <span className='text-foreground/50 text-xs'>
                    {book.first_publish_year}
                  </span>
                )}
                
                <Button
                  isIconOnly
                  size='sm'
                  variant='light'
                  onPress={handleLikeClick}
                  className={cn(
                    'transition-colors',
                    liked ? 'text-danger' : 'text-foreground/40 hover:text-danger'
                  )}
                >
                  {liked ? '❤️' : '🤍'}
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-1 border-divider',
        className
      )}
      isPressable
      onPress={handleBookClick}
    >
      <CardBody className='p-4'>
        <div className='flex gap-4'>
          {/* Cover image */}
          <div className='relative h-24 w-16 shrink-0 overflow-hidden rounded-md'>
            <Image
              src={getCoverImage()}
              alt={book.title}
              fill
              sizes='64px'
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </div>
          
          {/* Content */}
          <div className='min-w-0 flex-1'>
            <div className='mb-3'>
              <h3 className='text-foreground mb-1 line-clamp-2 text-base font-semibold'>
                {book.title}
              </h3>
              <p className='text-foreground/60 text-sm'>
                by {formatAuthors()}
              </p>
            </div>
            
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3 text-xs text-foreground/50'>
                {book.first_publish_year && (
                  <span>{book.first_publish_year}</span>
                )}
                {book.ratings_average && (
                  <div className='flex items-center gap-1'>
                    <span className='text-yellow-500'>★</span>
                    <span>{book.ratings_average.toFixed(1)}</span>
                  </div>
                )}
                {book.number_of_pages_median && (
                  <span>{book.number_of_pages_median} pages</span>
                )}
              </div>
              
              <Button
                isIconOnly
                size='sm'
                variant='light'
                onPress={handleLikeClick}
                className={cn(
                  'transition-colors',
                  liked ? 'text-danger' : 'text-foreground/40 hover:text-danger'
                )}
              >
                {liked ? '❤️' : '🤍'}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BookCardComponent
