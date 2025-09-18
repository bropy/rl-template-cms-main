'use client'

import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import { Textarea } from '@heroui/input'
import { cn } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'

// Zod validation schema
const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  rating: z.number().min(1, 'Please select a rating').max(5, 'Rating must be between 1 and 5'),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be less than 500 characters'),
})

type FeedbackFormData = z.infer<typeof feedbackSchema>

// interface
export interface LibraryFeedback extends FeedbackFormData {
  id: string
  createdAt: string
}

// interface
interface IProps {
  className?: string
  onSubmit: (feedback: LibraryFeedback) => void
}

// component
const LibraryFeedbackComponent: FC<Readonly<IProps>> = ({ className, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 0,
      comment: '',
    },
  })

  const rating = watch('rating')

  const handleFormSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const feedback: LibraryFeedback = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }

      onSubmit(feedback)
      setSubmitSuccess(true)
      reset()

      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingClick = (selectedRating: number) => {
    setValue('rating', selectedRating, { shouldValidate: true })
  }

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>💬 Share Your Thoughts</h2>

        <p className='text-foreground/60 text-lg'>Help us improve your library experience</p>
      </div>

      <Card className='border-divider mx-auto max-w-2xl border-1'>
        <CardHeader className='pb-4'>
          <h3 className='text-foreground text-xl font-semibold'>Library Feedback</h3>
        </CardHeader>

        <CardBody className='pt-0'>
          {submitSuccess && (
            <div className='bg-success/10 border-success/20 mb-6 rounded-lg border p-4 text-center'>
              <div className='mb-2 text-2xl'>🎉</div>

              <p className='text-success font-medium'>Thank you for your feedback!</p>

              <p className='text-success/80 text-sm'>Your comment will appear below shortly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
            <div>
              <Input
                {...register('name')}
                label='Your Name'
                placeholder='Enter your name'
                variant='bordered'
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                classNames={{
                  inputWrapper: 'border-default-300 hover:border-primary focus-within:!border-primary',
                }}
              />
            </div>

            <div>
              <Input
                {...register('email')}
                label='Email (Optional)'
                placeholder='your.email@example.com'
                type='email'
                variant='bordered'
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  inputWrapper: 'border-default-300 hover:border-primary focus-within:!border-primary',
                }}
              />
            </div>

            <div>
              <label className='text-foreground mb-3 block text-sm font-medium'>
                How would you rate our library? *
              </label>
              <div className='flex items-center gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => handleRatingClick(star)}
                    className={cn(
                      'text-2xl transition-all duration-200 hover:scale-110',
                      rating >= star ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400',
                    )}
                  >
                    ★
                  </button>
                ))}
                <span className='text-foreground/60 ml-2 text-sm'>
                  {rating > 0 &&
                    (rating === 5
                      ? 'Excellent!'
                      : rating === 4
                        ? 'Very Good!'
                        : rating === 3
                          ? 'Good'
                          : rating === 2
                            ? 'Fair'
                            : 'Needs Improvement')}
                </span>
              </div>
              {errors.rating && <p className='text-danger mt-1 text-sm'>{errors.rating.message}</p>}
            </div>

            <div>
              <Textarea
                {...register('comment')}
                label='Your Comment'
                placeholder='Share your thoughts about our library, book selection, or any suggestions for improvement...'
                variant='bordered'
                minRows={4}
                maxRows={8}
                isInvalid={!!errors.comment}
                errorMessage={errors.comment?.message}
                classNames={{
                  inputWrapper: 'border-default-300 hover:border-primary focus-within:!border-primary',
                }}
              />
            </div>

            <div className='flex justify-center pt-4'>
              <Button type='submit' color='primary' size='lg' isLoading={isSubmitting} className='min-w-[200px]'>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}

export default LibraryFeedbackComponent
