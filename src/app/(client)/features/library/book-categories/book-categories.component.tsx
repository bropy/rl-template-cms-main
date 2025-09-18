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
        <h2 className='text-foreground mb-2 text-3xl font-bold'>Browse by Category</h2>
        <p className='text-foreground/70 mx-auto max-w-2xl text-lg'>
          Explore our extensive collection organized by topics and genres
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {bookCategories.map((category) => (
          <Card
            key={category.id}
            className='group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
            isPressable
          >
            <CardBody className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='mb-2 text-4xl transition-transform duration-300 group-hover:scale-110'>
                  {category.icon}
                </div>

                <div className='min-w-0 flex-1'>
                  <div className='mb-2 flex items-center justify-between'>
                    <h3 className='text-foreground truncate text-xl font-semibold'>{category.name}</h3>
                    <span className='text-foreground/60 ml-2 text-sm font-medium'>
                      {category.bookCount.toLocaleString()}
                    </span>
                  </div>

                  <p className='text-foreground/70 mb-4 line-clamp-2 text-sm'>{category.description}</p>

                  <Button
                    color={category.color}
                    variant='flat'
                    size='sm'
                    className='w-full transition-transform duration-300 group-hover:scale-105'
                  >
                    Explore Category
                  </Button>
                </div>
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
