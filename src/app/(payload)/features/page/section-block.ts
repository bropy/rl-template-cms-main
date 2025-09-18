import { type Block } from 'payload'

import { contentAlignmentField, textAlignmentField } from '../../shared/fields/alignment'

// section block
export const SectionBlock: Block = {
  slug: 'sectionBlock',
  labels: {
    singular: 'Section Block',
    plural: 'Section Blocks',
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
      type: 'richText',
      name: 'content',
      label: 'Content',
      required: true,
      admin: {
        className: 'rich-text-container',
      },
    },
    {
      type: 'row',
      fields: [contentAlignmentField, textAlignmentField],
    },
  ],
}
