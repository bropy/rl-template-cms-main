import {
  ICategoriesBlock,
  IFeedbackBlock,
  IHeroBlock,
  IImageScrollerBlock,
  IListBlock,
  IProductsBlock,
  ISectionBlock,
  ITabsBlock,
  ITemplateBlock,
} from './block'
import { IImage, IMeta } from './common.model'
import { IProduct } from './product.model'

export interface ICategory {
  id: string
  updatedAt: string
  createdAt: string
  slug: string
  name: string
  image: IImage
  description?: string | null
  products: {
    docs: IProduct[]
  }
  blocks:
    | ITemplateBlock[]
    | IHeroBlock[]
    | ISectionBlock[]
    | IImageScrollerBlock[]
    | IListBlock[]
    | ITabsBlock[]
    | ICategoriesBlock[]
    | IFeedbackBlock[]
    | IProductsBlock[]
  meta: IMeta
}
