import { type Block } from 'payload'

import { actionFields } from '@/payload/shared/fields/action'

// header block
export const HeaderBlock: Block = {
  slug: 'headerBlock',
  labels: {
    singular: 'Header block',
    plural: 'Header blocks',
  },
  fields: [
    {
      type: 'array',
      name: 'actions',
      labels: {
        singular: 'Action',
        plural: 'Actions',
      },
      minRows: 1,
      maxRows: 4,
      fields: [...actionFields('button')],
    },
  ],
}
