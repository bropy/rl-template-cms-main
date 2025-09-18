import { type Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import { HydrationBoundary } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'

import { EPageKey } from '@/app/(client)/entities/models'
import { pagesQueryOptions } from '@/client/entities/api/page'
import { HomeModule } from '@/client/modules/home'
import { getQueryClient } from '@/pkg/libraries/rest-api'

// cache
export const dynamic = 'force-static'
export const revalidate = 120

// interface
interface IProps {
  params: Promise<{ locale: Locale }>
}

// component
const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const clientQuery = getQueryClient()
  await clientQuery.prefetchQuery(pagesQueryOptions({ pageSlug: EPageKey.PAGES_QUERY_HOME_PAGE, locale }))

  // return
  return (
    <HydrationBoundary state={dehydrate(clientQuery)}>
      <HomeModule pageSlug={EPageKey.PAGES_QUERY_HOME_PAGE} />
    </HydrationBoundary>
  )
}

export default Page
