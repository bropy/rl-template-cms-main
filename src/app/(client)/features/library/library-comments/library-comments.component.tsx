'use client'

import { type FC } from 'react'

import { Card, CardBody } from '@heroui/card'
import { cn } from '@heroui/react'

import type { LibraryFeedback } from '@/client/features/library/library-feedback'

// interface
interface IProps {
  comments: LibraryFeedback[]
  className?: string
}

// component
const LibraryCommentsComponent: FC<Readonly<IProps>> = (props) => {
  const { comments, className } = props
  if (comments.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={cn('text-sm', index < rating ? 'text-yellow-500' : 'text-gray-300')}>
        ★
      </span>
    ))
  }

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>💭 Community Feedback</h2>

        <p className='text-foreground/60 text-lg'>What our readers are saying about the library</p>
      </div>

      <div className='mx-auto max-w-4xl'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {comments.slice(0, 9).map((comment) => (
            <Card key={comment.id} className='border-divider border-1'>
              <CardBody className='p-4'>
                <div className='mb-3 flex items-center justify-between'>
                  <div>
                    <h4 className='text-foreground text-sm font-semibold'>{comment.name}</h4>

                    <div className='mt-1 flex items-center gap-1'>{renderStars(comment.rating)}</div>
                  </div>
                  <span className='text-foreground/50 text-xs'>{formatDate(comment.createdAt)}</span>
                </div>

                <p className='text-foreground/80 text-sm leading-relaxed'>&quot;{comment.comment}&quot;</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {comments.length > 9 && (
          <div className='mt-6 text-center'>
            <p className='text-foreground/60 text-sm'>Showing 9 of {comments.length} comments</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default LibraryCommentsComponent
