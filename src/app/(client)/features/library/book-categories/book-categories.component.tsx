import { type FC } from 'react'

import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { cn } from '@heroui/react'

// interface
interface ICategory {
  id: string
  name: string
  description: string
  bookCount: number
  icon: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

interface IProps {
  className?: string
}

// mock data for book categories
const bookCategories: ICategory[] = [
  {
    id: '1',
    name: 'Fiction',
    description: 'Novels, short stories, and imaginative literature',
    bookCount: 1247,
    icon: '📚',
    color: 'primary',
  },
  {
    id: '2',
    name: 'Science & Technology',
    description: 'Latest discoveries and technological advances',
    bookCount: 892,
    icon: '🔬',
    color: 'secondary',
  },
  {
    id: '3',
    name: 'History',
    description: 'Historical events, biographies, and chronicles',
    bookCount: 634,
    icon: '📜',
    color: 'warning',
  },
  {
    id: '4',
    name: 'Self-Help',
    description: 'Personal development and wellness guides',
    bookCount: 456,
    icon: '💡',
    color: 'success',
  },
  {
    id: '5',
    name: 'Art & Design',
    description: 'Visual arts, design principles, and creativity',
    bookCount: 378,
    icon: '🎨',
    color: 'danger',
  },
  {
    id: '6',
    name: 'Business',
    description: 'Entrepreneurship, management, and economics',
    bookCount: 567,
    icon: '💼',
    color: 'primary',
  },
]

// component
const BookCategoriesComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>📖 Browse by Category</h2>
        <p className='text-foreground/60 mb-4 text-lg'>
          Explore our extensive collection organized by topics and genres
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {bookCategories.map((category) => (
          <Card
            key={category.id}
            className='group cursor-pointer border-1 border-divider transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
            isPressable
          >
            <CardBody className='p-5'>
              <div className='text-center'>
                <div className='mb-3 text-3xl transition-transform duration-300 group-hover:scale-110'>
                  {category.icon}
                </div>
                
                <h3 className='text-foreground mb-1 text-lg font-semibold'>{category.name}</h3>
                
                <p className='text-foreground/60 mb-3 text-xs'>
                  {category.bookCount.toLocaleString()} books
                </p>
                
                <p className='text-foreground/70 mb-4 line-clamp-2 text-sm'>{category.description}</p>

                <Button
                  color={category.color}
                  variant='flat'
                  size='sm'
                  className='w-full transition-transform duration-200 group-hover:scale-105'
                >
                  Explore →
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className='mt-8 text-center'>
        <Button color='primary' variant='bordered' size='lg' className='min-w-[200px]'>
          View All Categories
        </Button>
      </div>
    </section>
  )
}

export default BookCategoriesComponent
