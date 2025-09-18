import { type Block } from 'payload'

import { actionFields } from '@/payload/shared/fields/action'
import { formFields } from '@/payload/shared/fields/form-field'

// feedback block
export const FeedbackBlock: Block = {
  slug: 'feedbackBlock',
  labels: {
    singular: 'Feedback Block',
    plural: 'Feedback Blocks',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      admin: {
        className: 'rich-text-container',
      },
    },
    {
      type: 'group',
      name: 'formField',
      fields: [...formFields('emailInput')],
    },
    {
      type: 'group',
      name: 'formAction',
      fields: [...actionFields('button')],
      admin: {
        condition: (_, siblingData) => siblingData.showSubmitButton,
      },
    },
    {
      name: 'showSubmitButton',
      type: 'checkbox',
      label: 'Show Submit Button',
      defaultValue: true,
    },
  ],
}
