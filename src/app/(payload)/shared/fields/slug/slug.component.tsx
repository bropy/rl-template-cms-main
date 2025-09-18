'use client'

import type { TextFieldClientProps } from 'payload'
import { type FC, useCallback, useEffect } from 'react'

import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui'

import { formatSlug } from './slug.service'

import './index.scss'

// interface
interface Props extends TextFieldClientProps {
  fieldToUse: string
  checkboxFieldPath: string
}

// component
export const SlugComponent: FC<Props> = (props) => {
  const { field, fieldToUse, checkboxFieldPath, path, readOnly: readOnlyFromProps } = props

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()

  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  // return
  return (
    <div className='field-type slug-field-component'>
      <div className='label-wrapper'>
        <FieldLabel htmlFor={`field-${path}`} label={field.label} />

        <Button className='lock-button' buttonStyle='none' onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={Boolean(readOnly)} />
    </div>
  )
}
