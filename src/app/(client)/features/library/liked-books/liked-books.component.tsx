'use client'

import { type FC, useState } from 'react'

import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { cn } from '@heroui/react'

import { BookCardComponent } from '@/client/features/library/book-card'
import { useLikedBooksStore } from '@/client/shared/store'

interface IProps {
  className?: string
}

const LikedBooksComponent: FC<Readonly<IProps>> = ({ className }) => {
  const { likedBooks, clearLikedBooks } = useLikedBooksStore()
  const [isExpanded, setIsExpanded] = useState(false)

  // Show only first 3 books when collapsed
  const displayedBooks = isExpanded ? likedBooks : likedBooks.slice(0, 3)
  const hasMoreBooks = likedBooks.length > 3

  if (likedBooks.length === 0) {
    return (
      <section className={cn('w-full', className)}>
        <div className='mb-8 text-center'>
          <h2 className='text-foreground mb-2 text-3xl font-bold'>❤️ My Liked Books</h2>
          <p className='text-foreground/60 text-lg'>Your personal collection of favorite books</p>
        </div>
        
        <Card className='border-1 border-divider'>
          <CardBody className='p-8'>
            <div className='py-8 text-center'>
              <div className='mb-4 text-6xl'>💔</div>
              <h3 className='text-foreground mb-2 text-xl font-semibold'>No liked books yet</h3>
              <p className='text-foreground/60 text-lg'>
                Start exploring and like some books to see them here!
              </p>
            </div>
          </CardBody>
        </Card>
      </section>
    )
  }

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-foreground mb-1 text-3xl font-bold'>❤️ My Liked Books</h2>
          <p className='text-foreground/60'>
            {likedBooks.length} book{likedBooks.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        
        {likedBooks.length > 0 && (
          <Button
            size='sm'
            variant='light'
            color='danger'
            onPress={() => {
              if (confirm('Are you sure you want to clear all liked books?')) {
                clearLikedBooks()
              }
            }}
          >
            Clear All
          </Button>
        )}
      </div>

      <Card className='border-1 border-divider'>
        <CardBody className='p-6'>
        <div className='space-y-3'>
          {displayedBooks.map((book) => {
            // Convert LikedBook back to IOpenLibraryBook format
            const bookForCard = {
              key: book.key,
              title: book.title,
              author_name: book.author_name,
              cover_i: book.cover_i,
              first_publish_year: book.first_publish_year,
            }
            
            return (
              <div key={book.key} className='relative'>
                <BookCardComponent 
                  book={bookForCard}
                  compact={true}
                />
                <div className='absolute top-2 left-2 text-xs text-foreground/50 bg-background/80 backdrop-blur-sm rounded px-2 py-1'>
                  Liked {new Date(book.likedAt).toLocaleDateString()}
                </div>
              </div>
            )
          })}
        </div>

        {hasMoreBooks && (
          <div className='mt-6 text-center'>
            <Button
              variant='bordered'
              size='sm'
              onPress={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  ↑ Show Less
                </>
              ) : (
                <>
                  ↓ Show {likedBooks.length - 3} More Books
                </>
              )}
            </Button>
          </div>
        )}

        {likedBooks.length > 0 && (
          <div className='mt-6 pt-4 border-t border-divider'>
            <div className='flex items-center justify-between text-xs text-foreground/50'>
              <span>
                Total liked books: {likedBooks.length}
              </span>
              <span>
                Latest: {new Date(likedBooks[0]?.likedAt || '').toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
        </CardBody>
      </Card>
    </section>
  )
}

export default LikedBooksComponent
