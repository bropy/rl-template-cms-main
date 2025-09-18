import { type Block } from 'payload'

import { actionFields } from '@/payload/shared/fields/action'

// list block
export const ListBlock: Block = {
  slug: 'listBlock',
  labels: {
    singular: 'List Block',
    plural: 'List Blocks',
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
      type: 'array',
      name: 'rows',
      label: 'Rows',
      minRows: 1,
      maxRows: 11,
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          required: true,
          relationTo: 'images',
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'text',
          name: 'description',
          label: 'Description',
          required: true,
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'action',
      label: 'Action',
      admin: {
        condition: (_, siblingData) => siblingData?.showAction,
      },
      fields: [...actionFields('button')],
    },
    {
      type: 'checkbox',
      name: 'showAction',
      label: 'Show action',
      defaultValue: true,
    },
  ],
}
