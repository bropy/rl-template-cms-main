import { IActionField, IImage, IMeta, TAlignment } from './common.model'

// key
export enum ELayoutKey {
  LAYOUT_QUERY_ROOT_LAYOUT = 'root-layout',
}

// api
export enum ELayoutApi {
  API_LAYOUT = 'rest/globals/layout',
}

// query params
export interface ILayoutQueryParams {
  locale?: string
}

// menu column
interface IMenuColumn {
  id: string
  title: string
  links: IActionField[]
}

// header block
interface IHeaderBlock {
  id: string
  blockType: 'headerBlock'
  actions: IActionField[]
}

// footer block
interface IFooterBlock {
  id: string
  blockType: 'footerBlock'
  columns: IMenuColumn[]
  copyright: {
    text: string
    textAlignment: TAlignment
  }
}

// branding
interface IBranding {
  id: string
  logoImage: IImage
  logoIconSvg?: string
  logoAsIconSvg?: boolean
  favicon: IImage
  socialMediaLinks: {
    id: string
    socialPlatform:
      | 'facebook'
      | 'instagram'
      | 'x'
      | 'linkedin'
      | 'youtube'
      | 'tiktok'
      | 'pinterest'
      | 'snapchat'
      | 'twitch'
      | 'discord'
      | 'telegram'
      | 'whatsapp'
      | 'skype'
      | 'viber'
    socialUrl: string
    socialIconSvg?: string
  }[]
}

// root layout response
export interface IRootLayoutRes {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  meta: IMeta
  blocks: IHeaderBlock[] | IFooterBlock[]
  branding?: IBranding
}
