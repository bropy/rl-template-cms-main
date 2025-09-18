import { ICategory } from './category.model'
import { IActionField, IFormField, IImage, TAlignment, TRichText } from './common.model'
import { IProduct } from './product.model'

// hero block
export interface IHeroBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'heroBlock'
  title: string
  subtitle?: string | null
  image: IImage
  action?: IActionField | null
}

// image scroller block
export interface IImageScrollerBlock {
  id: string
  blockType: 'imageScrollerBlock'
  rows: {
    id: string
    image: IImage
  }[]
}

// section block
export interface ISectionBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'sectionBlock'
  title: string
  subtitle?: string | null
  content: TRichText
  contentAlignment: TAlignment
  textAlignment: TAlignment
}

// list block
export interface IListBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'listBlock'
  title: string
  subtitle?: string | null
  rows: {
    id: string
    image: IImage
    title: string
    description: string
    url: string
  }[]
  action?: IActionField | null
  showAction: boolean
}

// tabs block
export interface ITabsBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'tabsBlock'
  title: string
  subtitle?: string | null
  tabs?: {
    id: string
    label: string
    icon: string
    title: string
    image: IImage
    rows: {
      id: string
      icon: string
      description: string
    }[]
  }[]
}

// categories card block
export interface ICategoriesBlock {
  id: string
  slug: string
  name: string
  updatedAt: string
  createdAt: string
  blockType: 'categoriesBlock'
  title: string
  subtitle?: string | null
  cardBlockType: 'cards' | 'list'
  categories: {
    id: string
    category: ICategory
  }[]
}

// feedback block
export interface IFeedbackBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'feedbackBlock'
  title: string
  subtitle?: TRichText | null
  formField: IFormField
  formAction?: IActionField | null
  showSubmitButton: boolean
}

// template block
export interface ITemplateBlock {
  id: string
  name: string
  slug: string
  updatedAt: string
  createdAt: string
  blockType: 'templateBlock'
  template: {
    id: string
    name: string
    slug: string
    updatedAt: string
    createdAt: string
    blockType:
      | 'heroBlock'
      | 'sectionBlock'
      | 'imageScrollerBlock'
      | 'listBlock'
      | 'tabsBlock'
      | 'categoriesCardBlock'
      | 'feedbackBlock'
    blocks: (
      | IHeroBlock
      | ISectionBlock
      | IImageScrollerBlock
      | IListBlock
      | ITabsBlock
      | ICategoriesBlock
      | IFeedbackBlock
    )[]
  }
}

// products block
export interface IProductsBlock {
  id: string
  blockType: 'productsBlock'
  products?: {
    docs: IProduct[]
  }
}
