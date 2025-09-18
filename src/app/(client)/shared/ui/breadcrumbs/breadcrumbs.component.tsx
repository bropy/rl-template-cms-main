'use client'

import { ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FC } from 'react'

import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs'
import { Link } from '@heroui/link'

import { ESiteRoute } from '@/app/(client)/shared/routes/route.interface'
import { Link as NextLink, usePathname } from '@/pkg/libraries/locale'

// interface
interface IProps {}

// component
const BreadcrumbsComponent: FC<Readonly<IProps>> = () => {
  const pathname = usePathname()
  const { category_slug } = useParams()

  // return
  return (
    <Breadcrumbs className='hidden sm:block'>
      {pathname !== ESiteRoute.BASE && (
        <BreadcrumbItem separator={<ChevronRight size={16} />} isDisabled={pathname === ESiteRoute.BASE}>
          <Link href={ESiteRoute.BASE} as={NextLink} className={'text-small text-foreground'}>
            Home
          </Link>
        </BreadcrumbItem>
      )}

      {pathname.includes(ESiteRoute.CATEGORIES) && (
        <BreadcrumbItem
          separator={<ChevronRight size={16} />}
          isDisabled={pathname.includes(ESiteRoute.CATEGORIES) && !category_slug}
        >
          <Link href={ESiteRoute.CATEGORIES} as={NextLink} className={'text-small text-foreground'}>
            Categories
          </Link>
        </BreadcrumbItem>
      )}

      {category_slug && (
        <BreadcrumbItem separator={<ChevronRight size={16} />} isDisabled={pathname.includes(ESiteRoute.CATEGORIES)}>
          <Link href={ESiteRoute.CATEGORIES} as={NextLink} className={'text-small text-foreground capitalize'}>
            {category_slug?.toString()?.replace('--', ' & ')?.replace(/_/g, ' ')?.replace(/-/g, ' ')}
          </Link>
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  )
}

export default BreadcrumbsComponent
