import Image from 'next/image'
import { type FC } from 'react'

import { Skeleton } from '@heroui/skeleton'

import { IImageScrollerBlock } from '@/app/(client)/entities/models'
import { ScrollerComponent } from '@/app/(client)/shared/ui/scroller'

// interface
interface IProps {
  data: IImageScrollerBlock
  isLoading?: boolean
}

// component
const ImageScrollerBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  // return
  return (
    <Skeleton isLoaded={!isLoading} as='section' id={data?.id}>
      <ScrollerComponent shouldPauseOnHover gap='40px' className='mx-auto max-w-[90dvw]'>
        {[...Array(9)]
          .flatMap(() => data?.rows || [])
          .map((item, idx) => (
            <div
              key={`image-scroller-${item?.id}-${idx}`}
              className='text-foreground relative flex h-6 min-w-[80px] items-center justify-center'
            >
              <Image src={item?.image?.url} alt={item?.image?.alt} fill className='object-contain' />
            </div>
          ))}
      </ScrollerComponent>
    </Skeleton>
  )
}

export default ImageScrollerBlockComponent
