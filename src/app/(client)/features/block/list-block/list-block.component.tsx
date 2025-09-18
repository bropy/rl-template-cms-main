import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Divider } from '@heroui/divider'
import { Skeleton } from '@heroui/skeleton'

import { IListBlock } from '@/client/entities/models/block'
import { ActionComponent } from '@/client/shared/ui/action'
import { Link } from '@/pkg/libraries/locale'

// interface
interface IProps {
  data: IListBlock
  isLoading?: boolean
}

// component
const ListBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  const t = useTranslations()

  // return
  return (
    <Skeleton
      isLoaded={!isLoading}
      as='section'
      id={data?.id}
      classNames={{
        content: 'rounded-3xl bg-primary-50/50 px-6 py-10 md:p-8',
      }}
    >
      <h2 className='text-primary-900 mb-1 flex items-center gap-2 text-3xl font-bold md:text-4xl'>{data.title}</h2>

      {data?.subtitle && <p className='text-foreground/70 mb-6 sm:text-xl md:text-lg xl:text-xl'>{data.subtitle}</p>}

      {data.rows?.slice(0, 1)?.map((item, index) => (
        <div key={`${item?.id}-${index}-top`} className='mb-6 flex flex-col gap-6 md:flex-row'>
          <div className='bg-default-100 h-[180px] w-full flex-shrink-0 overflow-hidden rounded-xl md:w-[320px]'>
            <Image
              src={item.image?.url}
              alt={item.image?.alt}
              width={320}
              height={180}
              priority={true}
              className='h-full w-full object-cover'
            />
          </div>

          <div className='flex flex-1 flex-col justify-center'>
            <h3 className='mb-2 text-2xl font-bold'>{item.title}</h3>

            <div className='text-foreground/70 mb-2 text-base md:text-lg'>
              <p className='text-foreground/70 mb-1 text-sm md:text-base'>
                {item.description}{' '}
                <Link href={item.url} className='text-primary-600 ml-1 underline'>
                  {t('show_more')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      ))}

      <Divider className='my-4' />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {data.rows?.slice(1)?.map((item, index) => (
          <div key={`${item?.id}-${index}-additional`} className='flex items-start gap-4'>
            <div className='bg-default-100 h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg'>
              <Image
                src={item.image.url}
                alt={item.image.alt}
                width={80}
                height={80}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='flex-1'>
              <h4 className='mb-1 text-lg font-bold'>{item.title}</h4>

              <p className='text-foreground/70 mb-1 text-sm md:text-base'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {data?.showAction && data?.action && (
        <div className='mt-8 flex justify-center'>
          <ActionComponent {...data?.action} />
        </div>
      )}
    </Skeleton>
  )
}

export default ListBlockComponent
