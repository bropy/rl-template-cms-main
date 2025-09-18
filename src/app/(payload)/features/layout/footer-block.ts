import { type Block } from 'payload'

import { actionFields } from '@/payload/shared/fields/action'
import { textAlignmentField } from '@/payload/shared/fields/alignment'

// footer block
export const FooterBlock: Block = {
  slug: 'footerBlock',
  labels: {
    singular: 'Footer block',
    plural: 'Footer blocks',
  },
  fields: [
    {
      type: 'array',
      name: 'columns',
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      minRows: 1,
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'array',
          name: 'links',
          label: 'Links',
          minRows: 1,
          maxRows: 10,
          fields: [...actionFields('link')],
        },
      ],
    },
    {
      type: 'group',
      name: 'copyright',
      label: 'Copyright',
      admin: {
        className: 'group-last-container',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
          defaultValue: '© 2025 All rights reserved.',
        },
        textAlignmentField,
      ],
    },
  ],
}
