import { queryOptions } from '@tanstack/react-query'

import { layoutQueryApi } from './layout.api'

import { ELayoutKey, ILayoutQueryParams } from '../../models/layout.model'

// options
export const layoutQueryOptions = (queryParams: ILayoutQueryParams) => {
  const { locale = 'en' } = queryParams

  return queryOptions({
    queryKey: [ELayoutKey.LAYOUT_QUERY_ROOT_LAYOUT, locale],
    queryFn: (params) => layoutQueryApi(params, queryParams),
    select: (data) => {
      return {
        meta: data?.meta,
        branding: data?.branding,
        headerBlock: data?.blocks?.find((block) => block.blockType === 'headerBlock'),
        footerBlock: data?.blocks?.find((block) => block.blockType === 'footerBlock'),
      }
    },
  })
}
