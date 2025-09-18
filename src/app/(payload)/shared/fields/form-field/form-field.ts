import { Field } from 'payload'

// interface
type IValue = 'textInput' | 'emailInput' | 'phoneInput' | 'textareaInput' | 'select' | 'checkbox' | 'radio'

// form fields
export const formFields = (value?: IValue): Field[] => {
  return [
    {
      type: 'select',
      name: 'fieldType',
      label: 'Field Type',
      required: true,
      options: [
        { label: 'Text Input', value: 'textInput' },
        { label: 'Email', value: 'emailInput' },
        { label: 'Phone', value: 'phoneInput' },
        { label: 'Textarea', value: 'textareaInput' },
        { label: 'Select', value: 'select' },
        { label: 'Checkbox', value: 'checkbox' },
        { label: 'Radio', value: 'radio' },
      ],
      defaultValue: value || 'textInput',
      filterOptions: (args) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return args.options.filter((option: any) => {
          if (value) {
            return option.value === value
          }

          return true
        })
      },
      dbName: 'field_type',
      custom: { postgres: { type: 'text' } },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'fieldLabel',
          label: 'Label',
        },
        {
          name: 'fieldPlaceholder',
          type: 'text',
          label: 'Placeholder',
          admin: {
            condition: (_, siblingData) => {
              return siblingData.fieldType !== 'radio' && siblingData.fieldType !== 'checkbox'
            },
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'fieldIsRequired',
      type: 'checkbox',
      label: 'Required',
      defaultValue: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fieldInfoMessage',
          type: 'text',
          label: 'Info Message',
        },
        {
          name: 'fieldErrorMessage',
          type: 'text',
          label: 'Error Message',
          admin: {
            condition: (_, siblingData) => siblingData.fieldIsRequired,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'fieldOptions',
      label: 'Options',
      required: true,
      admin: {
        condition: (_, siblingData) => {
          return (
            siblingData.fieldType === 'select' ||
            siblingData.fieldType === 'radio' ||
            siblingData.fieldType === 'checkbox'
          )
        },
      },
      fields: [
        {
          type: 'text',
          name: 'fieldOptionLabel',
          label: 'Option Label',
          required: true,
        },
        {
          name: 'fieldOptionValue',
          type: 'text',
          label: 'Option Value',
          required: true,
        },
      ],
    },
  ]
}
