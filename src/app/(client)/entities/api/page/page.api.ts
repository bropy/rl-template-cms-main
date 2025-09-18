import { Where } from 'payload'
import { stringify } from 'qs-esm'

import { QueryFunctionContext } from '@tanstack/react-query'

import { EPageApi, type IPageQueryParams, IPageRes } from '@/client/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api'

// api
export const pagesQueryApi = async (opt: QueryFunctionContext, queryParams: IPageQueryParams) => {
  const { pageSlug, locale = 'en' } = queryParams

  const where: Where = { slug: { equals: pageSlug } }
  const query = stringify({ where, depth: 4, draft: false, locale }, { addQueryPrefix: true })

  const res = await restApiFetcher
    .get<IPageRes>(`${EPageApi.API_PAGES}${query}`, {
      signal: opt.signal,
      cache: 'force-cache',
      next: { revalidate: 120 },
    })
    .json()

  return res?.docs?.at(0)
}
