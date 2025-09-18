import { Field } from 'payload'

// content alignment field
export const contentAlignmentField: Field = {
  type: 'select',
  name: 'contentAlignment',
  label: 'Content Alignment',
  required: true,
  options: [
    { label: 'Content Left', value: 'left' },
    { label: 'Content Center', value: 'center' },
    { label: 'Content Right', value: 'right' },
  ],
  defaultValue: 'left',
  dbName: 'content_align',
  custom: { postgres: { type: 'text' } },
}

// text alignment field
export const textAlignmentField: Field = {
  type: 'select',
  name: 'textAlignment',
  label: 'Text Alignment',
  required: true,
  options: [
    { label: 'Text Left', value: 'left' },
    { label: 'Text Center', value: 'center' },
    { label: 'Text Right', value: 'right' },
  ],
  defaultValue: 'left',
  dbName: 'text_align',
  custom: { postgres: { type: 'text' } },
}
