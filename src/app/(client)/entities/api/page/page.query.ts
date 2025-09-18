import { queryOptions } from '@tanstack/react-query'

import { pagesQueryApi } from './page.api'

import { type IPageQueryParams } from '../../models/page.model'

// options
export const pagesQueryOptions = (queryParams: IPageQueryParams) => {
  const { pageSlug, locale = 'en' } = queryParams

  return queryOptions({
    queryKey: [pageSlug, locale],
    queryFn: (params) => pagesQueryApi(params, queryParams),
  })
}
