'use client'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type FC, use, useCallback, useEffect, useState } from 'react'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Card, CardBody } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { type IOpenLibraryWork, openLibraryApi, workQueryOptions } from '@/client/entities/api/openlibrary'
import { cacheManagerService } from '@/client/entities/api/openlibrary/cache-manager.service'
import { slugResolverService } from '@/client/entities/api/openlibrary/slug-resolver.service'
import { useLikedBooksStore } from '@/client/shared/store'
import { ContainerComponent } from '@/client/shared/ui/container'

// interface
interface IProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

// component
const BookDetailModule: FC<Readonly<IProps>> = ({ params }) => {
  const { slug } = use(params)
  const { isLiked, toggleLike } = useLikedBooksStore()
  const queryClient = useQueryClient()
  const [workKey, setWorkKey] = useState<string | null>(null)
  const [isResolvingSlug, setIsResolvingSlug] = useState(true)

  const getDescription = useCallback((description: string | { value: string } | undefined) => {
    if (!description) return null
    if (typeof description === 'string') return description
    return description.value
  }, [])

  const getCoverUrl = useCallback((covers: number[] | undefined) => {
    if (covers && covers.length > 0) {
      return openLibraryApi.getCoverUrl(covers[0], 'L')
    }
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'
  }, [])

  useEffect(() => {
    const resolveSlug = async () => {
      setIsResolvingSlug(true)
      try {
        const resolvedWorkKey = await slugResolverService.resolveSlugToWorkKey(slug)
        setWorkKey(resolvedWorkKey || null)
      } catch (error) {
        setWorkKey(null)
      } finally {
        setIsResolvingSlug(false)
      }
    }
    resolveSlug()
  }, [slug])

  const {
    data: work,
    isLoading,
    error,
  } = useQuery({
    ...workQueryOptions(workKey || ''),
    enabled: !!workKey && !isResolvingSlug,
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: false,
  })

  const handleLikeToggle = useCallback(() => {
    if (work) {
      const bookLike = {
        key: work.key,
        title: work.title,
        author_name: work.authors?.map((a) => a.author.key.replace('/authors/', '')) || [],
        cover_i: work.covers?.[0],
        first_publish_year: work.first_publish_date ? parseInt(work.first_publish_date) : undefined,
      }
      toggleLike(bookLike)
    }
  }, [work, toggleLike])

  useEffect(() => {
    if (work && workKey && !isLoading && !error) {
      cacheManagerService.preloadAndCacheBook(workKey, slug, queryClient)
    }
  }, [work, workKey, isLoading, error, slug, queryClient])

  if (!isResolvingSlug && !workKey) {
    return (
      <ContainerComponent className='w-full py-12'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>❌</div>

          <h1 className='text-foreground mb-4 text-2xl font-bold'>Book Not Found</h1>

          <p className='text-foreground/60 mb-4'>The book with slug &quot;{slug}&quot; could not be found.</p>

          <Button color='primary' onPress={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </ContainerComponent>
    )
  }

  if (error) {
    notFound()
  }

  if (isLoading || isResolvingSlug) {
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

  const liked = isLiked(work.key)

  return (
    <ContainerComponent className='w-full space-y-8 pb-[72px]'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]'>
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

        <div className='space-y-6'>
          <div>
            <h1 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>{work.title}</h1>

            {work.authors && work.authors.length > 0 && (
              <div className='mb-4'>
                <p className='text-foreground/60 text-lg'>
                  by {work.authors.map((author) => author.author.key.replace('/authors/', '')).join(', ')}
                </p>
              </div>
            )}

            {work.first_publish_date && (
              <div className='mb-4'>
                <Badge variant='flat'>First published: {work.first_publish_date}</Badge>
              </div>
            )}
          </div>

          {getDescription(work.description) && (
            <Card>
              <CardBody className='p-6'>
                <h2 className='text-foreground mb-4 text-xl font-semibold'>Description</h2>

                <p className='text-foreground/80 leading-relaxed'>{getDescription(work.description)}</p>
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
            <Button
              color={liked ? 'danger' : 'primary'}
              variant={liked ? 'solid' : 'bordered'}
              size='lg'
              onPress={handleLikeToggle}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </Button>
          </div>
        </div>
      </div>
    </ContainerComponent>
  )
}

export default BookDetailModule
