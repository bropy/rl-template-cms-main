import Image from 'next/image'
import { type FC } from 'react'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { cn } from '@heroui/react'

// interface
interface IBook {
  id: string
  title: string
  author: string
  description: string
  imageUrl: string
  category: string
  rating: number
  isNew?: boolean
}

interface IProps {
  className?: string
}

// mock data for the library
const featuredBooks: IBook[] = [
  {
    id: '1',
    title: 'The Digital Revolution',
    author: 'Sarah Mitchell',
    description: 'A comprehensive guide to understanding how technology shapes our modern world.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    category: 'Technology',
    rating: 4.8,
    isNew: true,
  },
  {
    id: '2',
    title: 'Mindful Living',
    author: 'Dr. James Chen',
    description: 'Discover the art of mindfulness and its practical applications in daily life.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    category: 'Self-Help',
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Ocean Mysteries',
    author: 'Marine Explorer',
    description: 'Dive deep into the unexplored depths of our oceans and their hidden secrets.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    category: 'Science',
    rating: 4.9,
    isNew: true,
  },
  {
    id: '4',
    title: 'Modern Architecture',
    author: 'Elena Rodriguez',
    description: 'A visual journey through contemporary architectural marvels around the world.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    category: 'Architecture',
    rating: 4.7,
  },
]

// component
const FeaturedBooksComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>Featured Books</h2>
        <p className='text-foreground/70 text-lg'>Discover our most popular and recently added books</p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {featuredBooks.map((book) => (
          <Card key={book.id} className='group transition-shadow duration-300 hover:shadow-lg'>
            <CardBody className='p-0'>
              <div className='relative aspect-[3/4] overflow-hidden rounded-t-lg'>
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {book.isNew && (
                  <Badge color='success' className='absolute top-2 right-2 z-10' variant='solid'>
                    New
                  </Badge>
                )}
              </div>

              <div className='p-4'>
                <div className='mb-2'>
                  <Badge variant='flat' size='sm' className='mb-2'>
                    {book.category}
                  </Badge>
                </div>

                <h3 className='text-foreground mb-1 line-clamp-2 text-lg font-semibold'>{book.title}</h3>

                <p className='text-foreground/60 mb-2 text-sm'>by {book.author}</p>

                <p className='text-foreground/70 mb-3 line-clamp-2 text-sm'>{book.description}</p>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <span className='text-yellow-500'>★</span>
                    <span className='text-sm font-medium'>{book.rating}</span>
                  </div>
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
    </section>
  )
}

export default FeaturedBooksComponent
