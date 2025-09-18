import type { CollectionConfig } from 'payload'

import {
  CategoriesBlock,
  FeedbackBlock,
  HeroBlock,
  ImageScrollerBlock,
  ListBlock,
  SectionBlock,
  TabsBlock,
} from '../features/page'
import { TemplateBlock } from '../features/template/template-block'
import { seoFields } from '../shared/fields/seo'
import { slugField } from '../shared/fields/slug/slug-field'
import { versionField } from '../shared/fields/version'
import { authenticated, authenticatedOrPublished } from '../shared/services'

// products
export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: [
      'image',
      'shortName',
      'slug',
      '_status',
      'categories',
      'estimatedPrice',
      'isBestChoice',
      'isValueForMoney',
      'createdAt',
    ],
    useAsTitle: 'shortName',
    group: 'Content',
  },
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    ...slugField('shortName'),
    {
      type: 'group',
      label: 'Options',
      admin: {
        position: 'sidebar',
        className: 'group-last-container',
      },
      fields: [
        {
          type: 'checkbox',
          name: 'isBestChoice',
          label: 'Is Best Choice',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'isValueForMoney',
          label: 'Is Value for Money',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'hasDiscount',
          label: 'Has Discount',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'hasDetails',
          label: 'Has Details',
          defaultValue: false,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product',
          fields: [
            {
              type: 'upload',
              name: 'image',
              label: 'Image',
              required: true,
              relationTo: 'images',
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'shortName',
                  label: 'Short Name',
                  required: true,
                  admin: {
                    width: '20%',
                  },
                },
                {
                  type: 'text',
                  name: 'fullName',
                  label: 'Full Name',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'number',
                  name: 'estimatedPrice',
                  label: 'Estimated Price',
                  required: true,
                  admin: {
                    step: 1,
                    width: '20%',
                  },
                },
                {
                  type: 'number',
                  name: 'discountPercent',
                  label: 'Discount Percent',
                  required: true,
                  min: 1,
                  max: 100,
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData?.hasDiscount),
                    step: 1,
                    width: '20%',
                  },
                },
                {
                  type: 'relationship',
                  name: 'categories',
                  relationTo: 'categories',
                  label: 'Category',
                  hasMany: false,
                  required: true,
                },
              ],
            },
            {
              type: 'text',
              name: 'productLink',
              label: 'Product Link',
              required: true,
            },
            {
              type: 'group',
              name: 'rank',
              label: 'Rank',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'number',
                      name: 'value',
                      label: 'Value',
                      required: true,
                      min: 0,
                      max: 10,
                      defaultValue: 9.5,
                      admin: {
                        step: 0.1,
                        placeholder: 'E.g. 9.5',
                      },
                    },
                    {
                      type: 'text',
                      name: 'label',
                      label: 'Label',
                      required: true,
                      defaultValue: 'Exceptional',
                    },
                  ],
                },
              ],
            },
            {
              type: 'array',
              name: 'details',
              label: 'Details',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.hasDetails),
              },
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  label: 'Title',
                  required: true,
                },
                {
                  type: 'array',
                  name: 'rows',
                  label: 'Rows',
                  admin: {
                    className: 'group-last-container',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'text',
                          name: 'iconSvg',
                          label: 'Icon SVG',
                          required: true,
                          admin: {
                            width: '50%',
                            description: 'Copy and paste the icon svg code from: https://lucide.dev/icons',
                          },
                        },
                        {
                          type: 'text',
                          name: 'label',
                          label: 'Label',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
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
              ],
              minRows: 1,
              maxRows: 10,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: seoFields,
        },
      ],
    },
  ],
  versions: versionField,
}
