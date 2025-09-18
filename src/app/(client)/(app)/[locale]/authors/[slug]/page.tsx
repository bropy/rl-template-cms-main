'use client'

import { type FC, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { useQuery } from '@tanstack/react-query'

import { ContainerComponent } from '@/client/shared/ui/container'
import { 
  authorQueryOptions, 
  authorWorksQueryOptions, 
  openLibraryApi, 
  type IOpenLibraryAuthor, 
  type IOpenLibraryWork 
} from '@/client/entities/api/openlibrary'

interface IProps {
  params: {
    slug: string
    locale: string
  }
}

const AuthorWorksPage: FC<Readonly<IProps>> = ({ params }) => {
  const { slug } = params
  const router = useRouter()
  const authorKey = `/authors/${slug}`

  const { data: author, isLoading: isLoadingAuthor, error: authorError } = useQuery(
    authorQueryOptions(authorKey)
  )

  const { data: worksData, isLoading: isLoadingWorks, error: worksError } = useQuery(
    authorWorksQueryOptions(authorKey, 20, 0)
  )

  if (authorError || worksError) {
    notFound()
  }

  const handleWorkClick = useCallback((work: IOpenLibraryWork) => {
    const slug = openLibraryApi.createSlugFromWorkKey(work.key)
    router.push(`/books/${slug}`)
  }, [router])

  const getAuthorInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }, [])

  const formatLifespan = useCallback((author: IOpenLibraryAuthor) => {
    const birth = author.birth_date
    const death = author.death_date
    
    if (birth && death) {
      return `${birth} - ${death}`
    } else if (birth) {
      return `Born ${birth}`
    } else if (death) {
      return `Died ${death}`
    }
    return null
  }, [])

  const getDescription = useCallback((description: string | { value: string } | undefined) => {
    if (!description) return null
    if (typeof description === 'string') return description
    return description.value
  }, [])

  const getCoverUrl = useCallback((covers: number[] | undefined) => {
    if (covers && covers.length > 0) {
      return openLibraryApi.getCoverUrl(covers[0], 'M')
    }
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop'
  }, [])

  if (isLoadingAuthor) {
    return (
      <ContainerComponent className='w-full space-y-8 pb-[72px]'>
        <div className='mb-8 text-center'>
          <Skeleton className='mx-auto mb-4 h-32 w-32 rounded-full' />
          <Skeleton className='mx-auto mb-2 h-8 w-64 rounded' />
          <Skeleton className='mx-auto h-4 w-48 rounded' />
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardBody className='p-0'>
                <Skeleton className='aspect-[3/4] w-full rounded-t-lg' />
                <div className='p-4 space-y-2'>
                  <Skeleton className='h-4 w-3/4 rounded' />
                  <Skeleton className='h-3 w-1/2 rounded' />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </ContainerComponent>
    )
  }

  if (!author) {
    notFound()
  }

  return (
    <ContainerComponent className='w-full space-y-8 pb-[72px]'>
      {/* Author Header */}
      <div className='text-center'>
        <div className='mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary/20 text-primary'>
          <span className='text-4xl font-bold'>
            {getAuthorInitials(author.name)}
          </span>
        </div>

        <h1 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>
          {author.name}
        </h1>

        {formatLifespan(author) && (
          <p className='text-foreground/60 mb-4 text-lg'>
            {formatLifespan(author)}
          </p>
        )}

        {author.work_count && (
          <Badge variant='flat' size='lg' className='mb-6'>
            {author.work_count} works
          </Badge>
        )}

        {getDescription(author.bio) && (
          <Card className='mx-auto max-w-4xl'>
            <CardBody className='p-6'>
              <h2 className='text-foreground mb-4 text-xl font-semibold'>Biography</h2>
              <p className='text-foreground/80 leading-relaxed'>
                {getDescription(author.bio)}
              </p>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Author's Works */}
      <div>
        <h2 className='text-foreground mb-6 text-2xl font-bold'>Works by {author.name}</h2>

        {isLoadingWorks ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardBody className='p-0'>
                  <Skeleton className='aspect-[3/4] w-full rounded-t-lg' />
                  <div className='p-4 space-y-2'>
                    <Skeleton className='h-4 w-3/4 rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : worksData?.entries && worksData.entries.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {worksData.entries.map((work) => (
              <Card 
                key={work.key} 
                className='group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
                isPressable
                onPress={() => handleWorkClick(work)}
              >
                <CardBody className='p-0'>
                  <div className='relative aspect-[3/4] overflow-hidden rounded-t-lg'>
                    <Image
                      src={getCoverUrl(work.covers)}
                      alt={work.title}
                      fill
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                      className='object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  
                  <div className='p-4'>
                    <h3 className='text-foreground mb-2 line-clamp-2 text-lg font-semibold'>
                      {work.title}
                    </h3>
                    
                    {work.first_publish_date && (
                      <p className='text-foreground/60 mb-2 text-sm'>
                        Published: {work.first_publish_date}
                      </p>
                    )}
                    
                    {work.subjects && work.subjects.length > 0 && (
                      <p className='text-foreground/70 line-clamp-2 text-xs'>
                        {work.subjects.slice(0, 3).join(', ')}
                      </p>
                    )}
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
        ) : (
          <div className='py-12 text-center'>
            <div className='text-6xl mb-4'>📚</div>
            <h3 className='text-foreground mb-2 text-xl font-semibold'>No works found</h3>
            <p className='text-foreground/70'>
              We couldn't find any works by this author in our database.
            </p>
          </div>
        )}
      </div>
    </ContainerComponent>
  )
}

export default AuthorWorksPage
