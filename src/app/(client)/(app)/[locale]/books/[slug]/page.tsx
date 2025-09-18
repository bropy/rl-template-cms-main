'use client'

import { type FC } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { useQuery } from '@tanstack/react-query'

import { ContainerComponent } from '@/client/shared/ui/container'
import { workQueryOptions, openLibraryApi, type IOpenLibraryWork } from '@/client/entities/api/openlibrary'

interface IProps {
  params: {
    slug: string
    locale: string
  }
}

const BookDetailPage: FC<Readonly<IProps>> = ({ params }) => {
  const { slug } = params
  const workKey = `/works/${slug}`

  const { data: work, isLoading, error } = useQuery(
    workQueryOptions(workKey)
  )

  if (error) {
    notFound()
  }

  const getDescription = (description: string | { value: string } | undefined) => {
    if (!description) return null
    if (typeof description === 'string') return description
    return description.value
  }

  const getCoverUrl = (covers: number[] | undefined) => {
    if (covers && covers.length > 0) {
      return openLibraryApi.getCoverUrl(covers[0], 'L')
    }
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'
  }

  if (isLoading) {
    return (
      <ContainerComponent className='w-full space-y-8 pb-[72px]'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]'>
          <Skeleton className='aspect-[3/4] w-full rounded-lg' />
          <div className='space-y-4'>
            <Skeleton className='h-8 w-3/4 rounded' />
            <Skeleton className='h-4 w-1/2 rounded' />
            <Skeleton className='h-4 w-full rounded' />
            <Skeleton className='h-4 w-full rounded' />
            <Skeleton className='h-4 w-2/3 rounded' />
          </div>
        </div>
      </ContainerComponent>
    )
  }

  if (!work) {
    notFound()
  }

  return (
    <ContainerComponent className='w-full space-y-8 pb-[72px]'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]'>
        {/* Book Cover */}
        <div className='mx-auto w-full max-w-[300px]'>
          <div className='relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg'>
            <Image
              src={getCoverUrl(work.covers)}
              alt={work.title}
              fill
              sizes='300px'
              className='object-cover'
              priority
            />
          </div>
        </div>

        {/* Book Information */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>
              {work.title}
            </h1>

            {work.authors && work.authors.length > 0 && (
              <div className='mb-4'>
                <p className='text-foreground/60 text-lg'>
                  by {work.authors.map(author => author.author.key.replace('/authors/', '')).join(', ')}
                </p>
              </div>
            )}

            {work.first_publish_date && (
              <div className='mb-4'>
                <Badge variant='flat'>
                  First published: {work.first_publish_date}
                </Badge>
              </div>
            )}
          </div>

          {getDescription(work.description) && (
            <Card>
              <CardBody className='p-6'>
                <h2 className='text-foreground mb-4 text-xl font-semibold'>Description</h2>
                <p className='text-foreground/80 leading-relaxed'>
                  {getDescription(work.description)}
                </p>
              </CardBody>
            </Card>
          )}

          {work.subjects && work.subjects.length > 0 && (
            <Card>
              <CardBody className='p-6'>
                <h2 className='text-foreground mb-4 text-xl font-semibold'>Subjects</h2>
                <div className='flex flex-wrap gap-2'>
                  {work.subjects.slice(0, 10).map((subject, index) => (
                    <Badge key={index} variant='flat' size='sm'>
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {work.subject_places && work.subject_places.length > 0 && (
            <Card>
              <CardBody className='p-6'>
                <h2 className='text-foreground mb-4 text-xl font-semibold'>Places</h2>
                <div className='flex flex-wrap gap-2'>
                  {work.subject_places.slice(0, 8).map((place, index) => (
                    <Badge key={index} variant='flat' size='sm' color='secondary'>
                      {place}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          <div className='flex gap-4'>
            <Button color='primary' size='lg'>
              Read Online
            </Button>
            <Button color='primary' variant='bordered' size='lg'>
              Add to Reading List
            </Button>
          </div>
        </div>
      </div>
    </ContainerComponent>
  )
}

export default BookDetailPage
