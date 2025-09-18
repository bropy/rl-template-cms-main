import type { CollectionConfig } from 'payload'

import {
  CategoriesBlock,
  FeedbackBlock,
  HeroBlock,
  ImageScrollerBlock,
  ListBlock,
  ProductsBlock,
  SectionBlock,
  TabsBlock,
} from '../features/page'
import { TemplateBlock } from '../features/template/template-block'
import { seoFields } from '../shared/fields/seo'
import { slugField } from '../shared/fields/slug/slug-field'
import { versionField } from '../shared/fields/version'
import { authenticated, authenticatedOrPublished } from '../shared/services'

// categories
export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', '_status', 'image', 'createdAt'],
    useAsTitle: 'name',
    group: 'Content',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  fields: [
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Category',
          fields: [
            {
              type: 'text',
              name: 'name',
              label: 'Name',
              required: true,
            },
            {
              type: 'upload',
              name: 'image',
              label: 'Image',
              required: true,
              relationTo: 'images',
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
            },
          ],
        },
        {
          label: 'Product',
          fields: [
            {
              type: 'join',
              name: 'products',
              label: 'Products',
              hasMany: true,
              collection: 'products',
              on: 'categories',
              orderable: true,
              maxDepth: 2,
              where: {
                _status: { equals: 'published' },
              },
              admin: {
                defaultColumns: ['shortName', 'isBestChoice', 'isValueForMoney', 'image'],
              },
            },
          ],
        },
        {
          label: 'Page',
          fields: [
            {
              type: 'blocks',
              name: 'blocks',
              label: 'Blocks',
              labels: {
                singular: 'Block',
                plural: 'Blocks',
              },
              blocks: [
                TemplateBlock,
                HeroBlock,
                ImageScrollerBlock,
                SectionBlock,
                ListBlock,
                TabsBlock,
                CategoriesBlock,
                FeedbackBlock,
                ProductsBlock,
              ],
              minRows: 1,
              maxRows: 10,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [...seoFields],
        },
      ],
    },
  ],
  versions: versionField,
}
