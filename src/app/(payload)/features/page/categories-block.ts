import { type Block } from 'payload'

// categories block
export const CategoriesBlock: Block = {
  slug: 'categoriesBlock',
  labels: {
    singular: 'Categories Block',
    plural: 'Categories Blocks',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'text',
      name: 'subtitle',
      label: 'Subtitle',
    },
    {
      type: 'select',
      name: 'cardBlockType',
      label: 'Block Type',
      required: true,
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'cards',
      dbName: 'card_block_type',
      custom: { postgres: { type: 'text' } },
    },
    {
      type: 'array',
      name: 'categories',
      label: 'Categories',
      minRows: 1,
      maxRows: 20,
      admin: {
        className: 'group-last-container',
      },
      fields: [
        {
          type: 'relationship',
          name: 'category',
          label: 'Category',
          required: true,
          relationTo: 'categories',
          maxDepth: 3,
        },
      ],
    },
  ],
}
