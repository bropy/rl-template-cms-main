import Image from 'next/image'
import { type FC } from 'react'

import { Card, CardFooter } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { cn } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'

import { ICategoriesBlock } from '@/app/(client)/entities/models'
import { Link } from '@/pkg/libraries/locale'

// interface
interface IProps {
  data: ICategoriesBlock
  isLoading?: boolean
}

// component
const CategoriesBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  // return
  return (
    <Skeleton
      id={data?.id}
      isLoaded={!isLoading}
      as='section'
      className={cn({ '!mt-0': data?.cardBlockType === 'list' })}
    >
      {data?.cardBlockType === 'list' && (
        <>
          <div>
            <p className='mt-6 flex items-center gap-2 text-3xl font-bold md:text-4xl'>{data?.title}</p>

            {data?.subtitle && (
              <p className='text-foreground/70 mt-2 sm:text-xl md:text-lg xl:text-xl'>{data.subtitle}</p>
            )}
          </div>

          <Divider className='mx-auto mt-4' />

          <div className='grid gap-4 pt-8 sm:grid-cols-2 md:grid-cols-3'>
            {data?.categories?.map(({ category }, index) => (
              <Link
                key={`${category?.id}-${index}`}
                href={`/categories/${category?.slug}`}
                className='group/card grid h-[110px] cursor-pointer grid-cols-[120px_1fr] overflow-hidden rounded-xl border border-gray-200 transition-shadow duration-300 hover:shadow-md'
              >
                <span className='relative'>
                  {category?.image?.url ? (
                    <Image
                      src={category?.image?.url}
                      alt={category?.image?.alt}
                      fill
                      priority={true}
                      sizes='25vw'
                      className='h-full w-full max-w-full object-cover transition-transform duration-300 group-hover/card:scale-110'
                    />
                  ) : (
                    <div className='h-full w-full bg-gray-300' />
                  )}
                </span>

                <span className={'group-hover/card:text-primary p-4 text-lg font-bold transition-colors duration-300'}>
                  {category?.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {data?.cardBlockType === 'cards' && (
        <>
          <div>
            <p className='mb-2 flex items-center gap-2 text-3xl font-bold md:text-4xl'>{data?.title}</p>

            {data?.subtitle && <p className='text-foreground/70 sm:text-xl md:text-lg xl:text-xl'>{data?.subtitle}</p>}
          </div>

          <Divider className='mx-auto mt-4 mb-8' />

          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
            {data?.categories.map((category) => (
              <Card
                key={category?.category?.id}
                as={Link}
                href={`/categories/${category?.category?.slug}`}
                isFooterBlurred
                className='relative h-[200px] w-full cursor-pointer'
              >
                {category?.category?.image?.url ? (
                  <Image
                    src={category?.category?.image?.url}
                    alt={category?.category?.image?.alt}
                    fill
                    sizes='(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw'
                    className='z-0 h-full w-full -translate-y-6 scale-125 object-cover transition-transform duration-300 hover:scale-[1.5]'
                  />
                ) : (
                  <div className='h-full w-full bg-gray-300' />
                )}

                <CardFooter className='pointer-events-none absolute bottom-0 z-10 justify-between bg-white/30'>
                  <p className='text-l font-medium text-white'>{category?.category?.name}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </Skeleton>
  )
}

export default CategoriesBlockComponent
