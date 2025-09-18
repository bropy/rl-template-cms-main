import Image from 'next/image'
import { type FC, useState } from 'react'

import { Divider } from '@heroui/divider'
import { Skeleton } from '@heroui/skeleton'
import { Tab, Tabs } from '@heroui/tabs'

import { ITabsBlock } from '@/app/(client)/entities/models'

// interface
interface IProps {
  data: ITabsBlock
  isLoading?: boolean
}

// component
const TabsBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  const [activeTab, setActiveTab] = useState<string>(data?.tabs?.at(0)?.id || '')

  // return
  return (
    <Skeleton isLoaded={!isLoading} as='section' id={data?.id}>
      <div className='px-4 md:px-8'>
        <h2 className='mb-2 flex items-center gap-2 text-3xl font-bold md:text-4xl'>{data?.title}</h2>

        <p className='text-foreground/70 sm:text-xl md:text-lg xl:text-xl'>{data?.subtitle}</p>
      </div>

      <Divider className='mx-auto mt-4 max-w-[95%]' />

      <div className='flex flex-col items-start gap-6 p-4 md:flex-row md:gap-6 md:p-8'>
        <div className='flex min-w-0 flex-1 flex-col gap-4'>
          <Tabs aria-label='Options' color='primary' variant='bordered' radius='sm'>
            {data?.tabs?.map((tab) => (
              <Tab
                key={`${tab?.id}-tab`}
                onClick={() => setActiveTab(tab?.id)}
                title={
                  <div className='flex items-center space-x-2'>
                    <span className='[&_svg]:h-4 [&_svg]:w-4' dangerouslySetInnerHTML={{ __html: tab.icon }} />

                    <span>{tab?.label}</span>
                  </div>
                }
              >
                <p className='mb-2 text-base font-bold md:text-lg'>{tab?.title}</p>

                <ul className='text-foreground/70 space-y-3'>
                  {tab?.rows?.map((item, index) => (
                    <li key={`${item?.id}-${index}-list`} className='grid grid-cols-[auto_1fr] gap-2'>
                      <span
                        className='[&_svg]:fill-success mt-1 [&_svg]:h-4 [&_svg]:w-4'
                        dangerouslySetInnerHTML={{ __html: item.icon }}
                      />

                      <span className='text-foreground/70'>{item?.description}</span>
                    </li>
                  ))}
                </ul>
              </Tab>
            ))}
          </Tabs>
        </div>

        <div className='flex flex-shrink-0 items-center justify-center'>
          <div className='bg-default-100 relative aspect-[446/242] h-full w-full overflow-hidden rounded-xl md:h-[300px] md:w-[446px] lg:w-[500px]'>
            <Image
              src={data?.tabs?.find((tab) => tab?.id === activeTab)?.image?.url || ''}
              alt={data?.tabs?.find((tab) => tab?.id === activeTab)?.image?.alt || ''}
              fill
              sizes='(max-width: 768px) 75vw, 33vw'
              className='h-full w-full max-w-full object-cover'
            />
          </div>
        </div>
      </div>
    </Skeleton>
  )
}

export default TabsBlockComponent
