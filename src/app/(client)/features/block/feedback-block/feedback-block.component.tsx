import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { cn, Skeleton } from '@heroui/react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { type IFeedbackBlock } from '@/client/entities/models/block'
import { ActionComponent } from '@/client/shared/ui/action'
import { FieldComponent } from '@/client/shared/ui/field'

// interface
interface IProps {
  data: IFeedbackBlock
  isLoading?: boolean
}

// component
const FeedbackBlockComponent: FC<Readonly<IProps>> = (props) => {
  const { data, isLoading } = props

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({ defaultValues: { email: '' } })

  const onSubmit = handleSubmit((_data) => {
    reset()
  })

  // return
  return (
    <Skeleton
      isLoaded={!isLoading}
      as='section'
      id={data?.id}
      classNames={{
        content: cn(
          'mx-auto grid w-full max-w-[1000px]  gap-4 rounded-3xl bg-primary-50/50 p-6 align-middle sm:grid-cols-[1fr_auto] md:p-8',
        ),
      }}
    >
      {data?.title && <h3 className='text-2xl font-semibold md:text-3xl'>{data?.title}</h3>}

      {data?.subtitle && <RichText data={data?.subtitle} />}

      <div className='grid sm:w-[468px]'>
        <form onSubmit={onSubmit} className='align-center grid w-full sm:grid-cols-[1fr_auto]'>
          <FieldComponent
            {...data?.formField}
            name='email'
            control={control}
            isDisabled={isSubmitting}
            size='lg'
            className='bg-white sm:mr-2 sm:w-[360px]'
          />

          {data?.showSubmitButton && data?.formAction && (
            <ActionComponent
              {...data?.formAction}
              isDisabled={isSubmitting}
              className='mt-4 sm:mt-0'
              type={data?.formAction?.asLink ? 'button' : 'submit'}
              size='lg'
            />
          )}
        </form>
      </div>
    </Skeleton>
  )
}

export default FeedbackBlockComponent
