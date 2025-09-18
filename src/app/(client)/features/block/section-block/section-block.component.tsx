import { type FC } from 'react'

import { cn } from '@heroui/react'
import { Skeleton } from '@heroui/skeleton'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { ISectionBlock } from '@/client/entities/models/block'

// interface
interface IProps {
  data: ISectionBlock
  isLoading?: boolean
}

// component
const SectionBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  // return
  return (
    <Skeleton
      isLoaded={!isLoading}
      as='section'
      classNames={{
        content: cn('w-full grid', {
          'justify-center': data?.contentAlignment === 'center',
          'justify-start': data?.contentAlignment === 'left',
          'justify-end': data?.contentAlignment === 'right',
        }),
      }}
      id={data?.id}
    >
      <h2
        className={cn('text-primary-900 flex items-center gap-2 text-3xl font-bold md:text-4xl', {
          'text-center': data?.textAlignment === 'center',
          'text-left': data?.textAlignment === 'left',
          'text-right': data?.textAlignment === 'right',
        })}
      >
        {data.title}
      </h2>

      {data?.subtitle && (
        <p
          className={cn('text-foreground/70 mt-2 mb-6 sm:text-xl md:text-lg xl:text-xl', {
            'text-center': data?.textAlignment === 'center',
            'text-left': data?.textAlignment === 'left',
            'text-right': data?.textAlignment === 'right',
          })}
        >
          {data.subtitle}
        </p>
      )}

      <div className='prose prose-lg'>
        <RichText
          className={cn({
            'text-center': data?.textAlignment === 'center',
            'text-left': data?.textAlignment === 'left',
            'text-right': data?.textAlignment === 'right',
          })}
          data={data?.content}
        />
      </div>
    </Skeleton>
  )
}

export default SectionBlockComponent
