import { type Block } from 'payload'

// mission block
export const TabsBlock: Block = {
  slug: 'tabsBlock',
  labels: {
    singular: 'Tabs Block',
    plural: 'Tabs Blocks',
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
      name: 'tabs',
      label: 'Tabs',
      minRows: 1,
      maxRows: 3,
      admin: {
        className: 'group-last-container',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              required: true,
            },
            {
              type: 'text',
              name: 'icon',
              label: 'Icon',
              required: true,
              admin: {
                description: 'Copy and paste the icon svg code from: https://lucide.dev/icons',
              },
            },
          ],
        },
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'images',
          required: true,
          hasMany: false,
        },
        {
          type: 'array',
          name: 'rows',
          label: 'Rows',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              type: 'text',
              name: 'icon',
              label: 'Icon',
              required: true,
              admin: {
                description: 'Copy and paste the icon svg code from: https://lucide.dev/icons',
              },
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
