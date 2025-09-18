import { type Block } from 'payload'

import { actionFields } from '@/payload/shared/fields/action'

// hero block
export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
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
      name: 'subtitle',
      label: 'Subtitle',
    },
    {
      type: 'group',
      name: 'action',
      label: 'Action',
      admin: {
        className: 'group-last-container',
      },
      fields: [...actionFields('button')],
    },
  ],
}
