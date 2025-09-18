'use client'

import { type FC, useCallback, useState } from 'react'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { cn } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'
import { Spinner } from '@heroui/spinner'
import { useQuery } from '@tanstack/react-query'

import { authorSearchQueryOptions, type IOpenLibraryAuthor, openLibraryApi } from '@/client/entities/api/openlibrary'
import { useDebouncedCallback } from '@/client/shared/hooks'
import { useRouter } from '@/pkg/libraries/locale'

// interface
interface IProps {
  className?: string
}

// component
const AuthorSearchComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce search input to avoid too many API calls
  const debouncedSearch = useDebouncedCallback((query: string) => {
    setDebouncedQuery(query)
  }, 500)

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  // Query for author search results
  const { data: searchResults, isLoading, error } = useQuery(authorSearchQueryOptions(debouncedQuery, 16, 0))

  const handleAuthorClick = useCallback(
    (author: IOpenLibraryAuthor) => {
      // Create slug from author key and navigate to author works page
      const slug = openLibraryApi.createSlugFromAuthorKey(author.key)
      router.push(`/authors/${slug}`)
    },
    [router],
  )

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

  const formatBio = useCallback((bio: string | undefined) => {
    if (!bio) return null
    // Bio can sometimes be an object with value property
    const bioText = typeof bio === 'string' ? bio : bio
    return bioText.length > 150 ? `${bioText.substring(0, 150)}...` : bioText
  }, [])

  const getAuthorInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }, [])

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8'>
        <h2 className='text-foreground mb-4 text-3xl font-bold'>Search Authors</h2>
        <div className='mx-auto max-w-2xl'>
          <Input
            placeholder='Search for authors by name...'
            value={searchQuery}
            onValueChange={handleSearchChange}
            size='lg'
            variant='bordered'
            startContent={<div className='text-foreground/50'>👤</div>}
            endContent={isLoading && debouncedQuery ? <Spinner size='sm' /> : null}
          />
        </div>
      </div>

      {error && (
        <div className='bg-danger/10 mb-6 rounded-lg p-4 text-center'>
          <p className='text-danger mb-2 font-semibold'>
            Error searching authors: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <details className='text-danger/80 text-left text-xs'>
            <summary className='cursor-pointer'>View technical details</summary>
            <pre className='mt-2 whitespace-pre-wrap'>
              {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {debouncedQuery && searchResults && (
        <div className='mb-6'>
          <p className='text-foreground/70'>
            Found {searchResults.numFound.toLocaleString()} authors for &quot;{debouncedQuery}&quot;
          </p>
        </div>
      )}

      {isLoading && debouncedQuery ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  <Skeleton className='h-16 w-16 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-3/4 rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                    <Skeleton className='h-3 w-full rounded' />
                    <Skeleton className='h-3 w-2/3 rounded' />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : searchResults?.docs && searchResults.docs.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {searchResults.docs.map((author) => (
            <Card
              key={author.key}
              className='group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              isPressable
              onPress={() => handleAuthorClick(author)}
            >
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  {/* Author avatar placeholder */}
                  <div className='bg-primary/20 text-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105'>
                    <span className='text-lg font-bold'>{getAuthorInitials(author.name)}</span>
                  </div>

                  <div className='min-w-0 flex-1'>
                    <h3 className='text-foreground mb-1 text-lg font-semibold'>{author.name}</h3>

                    {formatLifespan(author) && (
                      <p className='text-foreground/60 mb-2 text-sm'>{formatLifespan(author)}</p>
                    )}

                    {author.work_count && (
                      <div className='mb-3'>
                        <Badge variant='flat' size='sm'>
                          {author.work_count} works
                        </Badge>
                      </div>
                    )}

                    {formatBio(author.bio) && (
                      <p className='text-foreground/70 mb-3 line-clamp-3 text-sm'>{formatBio(author.bio)}</p>
                    )}

                    {author.top_subjects && author.top_subjects.length > 0 && (
                      <div className='mb-3'>
                        <p className='text-foreground/60 text-xs'>
                          Popular subjects: {author.top_subjects.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>

              <CardFooter className='px-6 pt-0 pb-6'>
                <Button color='primary' variant='flat' className='w-full' size='sm'>
                  View Works
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : debouncedQuery && searchResults?.docs?.length === 0 ? (
        <div className='py-12 text-center'>
          <div className='mb-4 text-6xl'>👤</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>No authors found</h3>
          <p className='text-foreground/70'>Try searching with different keywords or check your spelling.</p>
        </div>
      ) : (
        <div className='py-12 text-center'>
          <div className='mb-4 text-6xl'>🔍</div>
          <h3 className='text-foreground mb-2 text-xl font-semibold'>Search for Authors</h3>
          <p className='text-foreground/70'>Enter an author&apos;s name to start searching.</p>
        </div>
      )}
    </section>
  )
}

export default AuthorSearchComponent
