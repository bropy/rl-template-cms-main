'use client'

import { useLocale } from 'next-intl'
import { FC } from 'react'

import { Divider } from '@heroui/divider'
import { cn } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'

import { layoutQueryOptions } from '@/client/entities/api/layout'
import { ActionComponent } from '@/client/shared/ui/action'
import { LogoComponent } from '@/client/shared/ui/logo'

// interface
interface IProps {}

// component
const FooterComponent: FC<Readonly<IProps>> = () => {
  const locale = useLocale()

  const { data } = useQuery(layoutQueryOptions({ locale }))

  const footerBlock = data?.footerBlock

  // return
  return (
    <footer className='bg-content2 dark:bg-content1 px-6 pt-16 pb-8'>
      <section className='mx-auto grid max-w-screen-lg gap-6 md:grid-cols-[auto_1fr] md:justify-items-end md:pb-10 lg:px-6'>
        <div className='grid content-start gap-6'>
          <LogoComponent
            src={data?.branding?.logoImage?.url}
            iconSvg={data?.branding?.logoIconSvg}
            isIconSvg={data?.branding?.logoAsIconSvg}
            w={120}
            h={40}
          />
        </div>

        <div className='grid md:grid-cols-[auto_1fr]'>
          <div className='my-6 grid grid-cols-2 gap-4 md:my-0 md:gap-20'>
            {footerBlock?.columns?.map((column, index) => (
              <div key={`${column?.id}-${index}-menu-column`}>
                <h4 className='mb-4 font-semibold uppercase'>{column?.title}</h4>

                <ul className='space-y-2'>
                  {column?.links?.map((link, index) => (
                    <li key={`${link?.id}-${index}-menu-column-link`}>
                      <ActionComponent {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {footerBlock?.copyright?.text && (
        <>
          <Divider className='mx-auto mb-4 max-w-screen-lg' />

          <p
            className={cn('mx-auto w-full max-w-screen-sm text-sm opacity-60', {
              'text-center': footerBlock?.copyright?.textAlignment === 'center',
              'text-left': footerBlock?.copyright?.textAlignment === 'left',
              'text-right': footerBlock?.copyright?.textAlignment === 'right',
            })}
          >
            {footerBlock?.copyright?.text}
          </p>
        </>
      )}
    </footer>
  )
}

export default FooterComponent
