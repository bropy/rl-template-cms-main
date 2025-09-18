import {
  ICategoriesBlock,
  IFeedbackBlock,
  IHeroBlock,
  IImageScrollerBlock,
  IListBlock,
  ISectionBlock,
  ITabsBlock,
  ITemplateBlock,
} from './block'
import { IMeta, IPagination } from './common.model'

// key
export enum EPageKey {
  PAGES_QUERY_HOME_PAGE = 'home-page',
}

// api
export enum EPageApi {
  API_PAGES = 'rest/pages',
}

// query params
export interface IPageQueryParams {
  pageSlug: string
  locale?: string
}

// page
export interface IPage {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blocks:
    | ITemplateBlock[]
    | IHeroBlock[]
    | ISectionBlock[]
    | IImageScrollerBlock[]
    | IListBlock[]
    | ITabsBlock[]
    | ICategoriesBlock[]
    | IFeedbackBlock[]
  meta: IMeta
}

// page response
export interface IPageRes extends IPagination {
  docs: IPage[]
}
