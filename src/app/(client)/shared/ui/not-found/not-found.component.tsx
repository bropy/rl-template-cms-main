'use client'

import { CircleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button } from '@heroui/button'

import { useRouter } from '@/pkg/libraries/locale'

// interface
interface IProps {
  title?: string
  description?: string
  buttonText?: string
}

// component
const NotFoundComponent: FC<Readonly<IProps>> = (props) => {
  const { title, description, buttonText } = props

  const t = useTranslations()

  const router = useRouter()

  // return
  return (
    <div className='grid h-fit w-fit place-items-center items-center gap-4'>
      <CircleAlert className='text-primary size-10' />

      <h1 className='text-2xl font-bold'>{title || t('not_found_title')}</h1>

      <p className='text-foreground/70 text-sm'>{description || t('not_found_description')}</p>

      <Button variant='flat' className='w-fit' color='primary' onPress={() => router.back()}>
        {buttonText || t('not_found_button')}
      </Button>
    </div>
  )
}

export default NotFoundComponent
