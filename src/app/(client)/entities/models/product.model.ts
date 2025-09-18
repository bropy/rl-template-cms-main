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
import { IImage, IMeta } from './common.model'

export interface IProduct {
  id: string
  updatedAt: string
  createdAt: string
  slug: string
  isBestChoice: boolean
  isValueForMoney: boolean
  hasDiscount: boolean
  hasDetails: boolean
  image: IImage
  shortName: string
  fullName: string
  estimatedPrice: number
  discountPercent: number
  productLink: string
  rank: {
    value: number
    label: string
  }
  details?: {
    title: string
    rows: {
      iconSvg: string
      label: string
    }[]
  }[]
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
