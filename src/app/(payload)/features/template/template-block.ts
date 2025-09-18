import { type Block } from 'payload'

// template block
export const TemplateBlock: Block = {
  slug: 'templateBlock',
  labels: {
    singular: 'Template Block',
    plural: 'Template Blocks',
  },
  fields: [
    {
      type: 'relationship',
      name: 'template',
      label: 'Template',
      required: true,
      relationTo: 'templates',
    },
  ],
}
