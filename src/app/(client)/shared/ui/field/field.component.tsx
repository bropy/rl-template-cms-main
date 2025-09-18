import { type FC } from 'react'
import { type Control, Controller } from 'react-hook-form'

import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@heroui/checkbox'
import { Input, type InputProps } from '@heroui/input'
import { Radio, RadioGroup, RadioGroupProps } from '@heroui/radio'
import { cn } from '@heroui/react'
import { Select, SelectItem, SelectProps } from '@heroui/select'

import { type IFormField } from '@/client/entities/models/common.model'

// interface
interface IProps extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>
  name: string
  size?: InputProps['size'] | SelectProps['size'] | CheckboxGroupProps['size'] | RadioGroupProps['size']
  className?: string
  isDisabled?: boolean
}

// component
const FieldComponent: FC<Readonly<IProps>> = (props) => {
  const {
    fieldType,
    fieldLabel,
    fieldPlaceholder,
    fieldIsRequired,
    fieldInfoMessage,
    fieldErrorMessage,
    fieldOptions,
    name,
    className,
    size,
    isDisabled,
    control,
  } = props

  // return
  return (
    <>
      {(fieldType === 'emailInput' || fieldType === 'textInput' || fieldType === 'textarea') && (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
            <div className='grid'>
              <Input
                type={fieldType === 'emailInput' ? 'email' : fieldType === 'textarea' ? 'textarea' : 'text'}
                label={fieldLabel}
                value={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={fieldErrorMessage || error?.message}
                size={size}
                labelPlacement='outside'
                classNames={{ inputWrapper: cn(className) }}
                placeholder={fieldPlaceholder}
                isDisabled={isDisabled}
              />

              {fieldInfoMessage && !error && <p className='text-tiny text-foreground/60 p-[4px]'>{fieldInfoMessage}</p>}
            </div>
          )}
          rules={{ required: fieldIsRequired }}
        />
      )}

      {fieldType === 'select' && (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
            <Select
              label={fieldLabel}
              value={value}
              onSelectionChange={onChange}
              isInvalid={invalid}
              size={size}
              classNames={{ base: cn(className) }}
              errorMessage={fieldErrorMessage || error?.message}
              placeholder={fieldPlaceholder}
              isDisabled={isDisabled}
            >
              {fieldOptions ? (
                fieldOptions.map((option) => <SelectItem key={option.value}>{option.label}</SelectItem>)
              ) : (
                <SelectItem key='placeholder'>{fieldPlaceholder}</SelectItem>
              )}
            </Select>
          )}
          rules={{ required: fieldIsRequired }}
        />
      )}

      {fieldType === 'radio' && (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
            <RadioGroup
              label={fieldLabel}
              value={value}
              onValueChange={onChange}
              isInvalid={invalid}
              errorMessage={fieldErrorMessage || error?.message}
              size={size}
              classNames={{ base: cn(className) }}
              isDisabled={isDisabled}
            >
              {fieldOptions?.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
          rules={{ required: fieldIsRequired }}
        />
      )}

      {fieldType === 'checkbox' && (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
            <CheckboxGroup
              label={fieldLabel}
              value={value}
              onValueChange={onChange}
              isInvalid={invalid}
              errorMessage={fieldErrorMessage || error?.message}
              size={size}
              classNames={{ base: cn(className) }}
              isDisabled={isDisabled}
            >
              {fieldOptions?.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
          rules={{ required: fieldIsRequired }}
        />
      )}
    </>
  )
}

export default FieldComponent
