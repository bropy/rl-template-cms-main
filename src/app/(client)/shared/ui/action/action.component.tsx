import { type FC } from 'react'

import { Button, type ButtonProps } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Link } from '@heroui/link'
import { cn } from '@heroui/react'

import { type IActionField } from '@/client/entities/models/common.model'
import { Link as NextLink } from '@/pkg/libraries/locale'

// interface
interface IProps extends IActionField {
  onPress?: ButtonProps['onPress']
  prefetch?: boolean
  radius?: ButtonProps['radius']
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  className?: string
  isDisabled?: boolean
  disableRipple?: boolean
}

// component
const ActionComponent: FC<Readonly<IProps>> = (props) => {
  const {
    actionType,
    text,
    url,
    asLink,
    iconSvg,
    iconPosition,
    linkColor,
    buttonColor,
    buttonVariant,
    openInNewTab,
    linkVariant,
    className,
    radius,
    size,
    prefetch = true,
    isDisabled,
    type = 'button',
    disableRipple,
    onPress,
  } = props

  // return
  return (
    <>
      {(actionType === 'button' || actionType === 'buttonIcon' || actionType === 'buttonIconOnly') && (
        <>
          {!asLink ? (
            <Button
              type={type}
              size={size}
              onPress={onPress}
              startContent={
                iconSvg &&
                iconPosition === 'left' &&
                actionType !== 'button' && (
                  <span className='[&_svg]:w-4' dangerouslySetInnerHTML={{ __html: iconSvg }} />
                )
              }
              endContent={
                iconSvg &&
                iconPosition === 'right' &&
                actionType !== 'button' && (
                  <span className='[&_svg]:w-4' dangerouslySetInnerHTML={{ __html: iconSvg }} />
                )
              }
              className={cn(className)}
              isIconOnly={actionType === 'buttonIconOnly'}
              radius={radius}
              variant={buttonVariant}
              color={buttonColor}
              isDisabled={isDisabled}
              disableRipple={disableRipple}
            >
              {text}
            </Button>
          ) : (
            <Button
              size={size}
              href={url ?? '/'}
              as={NextLink}
              prefetch={prefetch}
              target={openInNewTab ? '_blank' : '_self'}
              onPress={onPress}
              startContent={
                iconSvg &&
                iconPosition === 'left' &&
                actionType !== 'button' && (
                  <span className='[&_svg]:w-[20px]' dangerouslySetInnerHTML={{ __html: iconSvg }} />
                )
              }
              endContent={
                iconSvg &&
                iconPosition === 'right' &&
                actionType !== 'button' && (
                  <span className='[&_svg]:w-[20px]' dangerouslySetInnerHTML={{ __html: iconSvg }} />
                )
              }
              className={cn(className)}
              isIconOnly={actionType === 'buttonIconOnly'}
              radius={radius}
              variant={buttonVariant}
              color={buttonColor}
              isDisabled={isDisabled}
              disableRipple={disableRipple}
            >
              {text}
            </Button>
          )}
        </>
      )}

      {(actionType === 'link' || actionType === 'linkIcon' || actionType === 'linkIconOnly') && (
        <Link
          href={url ?? '/'}
          as={NextLink}
          size={size}
          prefetch={prefetch}
          target={openInNewTab ? '_blank' : '_self'}
          className={cn('group relative grid w-fit items-center gap-1 text-sm', className, {
            'grid-cols-[auto_1fr]': actionType === 'linkIcon' && iconPosition === 'left',
            'grid-cols-[1fr_auto]': actionType === 'linkIcon' && iconPosition === 'right',
          })}
          color={linkColor || 'foreground'}
          isDisabled={isDisabled}
        >
          {iconSvg && actionType !== 'link' && iconPosition === 'left' && (
            <span className='[&_svg]:max-h-4 [&_svg]:max-w-4' dangerouslySetInnerHTML={{ __html: iconSvg }} />
          )}

          {actionType === 'linkIconOnly' ? null : text}

          {iconSvg && actionType !== 'link' && iconPosition === 'right' && (
            <span className='[&_svg]:h-4 [&_svg]:w-4' dangerouslySetInnerHTML={{ __html: iconSvg }} />
          )}

          {linkVariant === 'underline' && (
            <Divider className='bg-foreground absolute right-0 bottom-0 left-0 -mb-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          )}
        </Link>
      )}
    </>
  )
}

export default ActionComponent
