'use client'

import Image from 'next/image'
import { type FC } from 'react'

import { cn } from '@heroui/react'

import { IconLogo } from '@/app/(client)/shared/assets/icon'
import { ESiteRoute } from '@/app/(client)/shared/routes/route.interface'
import { Link, usePathname } from '@/pkg/libraries/locale'

// interface
interface IProps {
  src?: string
  iconSvg?: string
  isIconSvg?: boolean
  w?: number
  h?: number
  className?: string
}

// component
const LogoComponent: FC<Readonly<IProps>> = (props) => {
  const { w = 50, h = 50, className = '', src, iconSvg, isIconSvg } = props

  const pathname = usePathname()

  // return
  return (
    <Link
      href={ESiteRoute.BASE}
      className={cn([`h-fit w-fit items-center`, { 'pointer-events-none': pathname === ESiteRoute.BASE }, className])}
      aria-label={'logo'}
    >
      {src && !isIconSvg ? (
        <Image src={src} alt='logo' width={w} height={h} priority={true} className='object-contain' />
      ) : iconSvg ? (
        <span className={`[&_svg]:h-[${h}px] [&_svg]:w-[${w}px]`} dangerouslySetInnerHTML={{ __html: iconSvg }} />
      ) : (
        <IconLogo width={w} height={h} className={'fill-foreground'} />
      )}
    </Link>
  )
}

export default LogoComponent
