'use client'

import { Children, cloneElement, forwardRef } from 'react'

import { cn } from '@heroui/react'
import { ScrollShadow, ScrollShadowProps } from '@heroui/scroll-shadow'

// interface
interface ScrollingBannerProps extends ScrollShadowProps {
  isReverse?: boolean
  showShadow?: boolean
  shouldPauseOnHover?: boolean
  isVertical?: boolean
  gap?: string
  duration?: number
  opacity?: string
}

// component
const ScrollerComponent = forwardRef<HTMLDivElement, ScrollingBannerProps>(
  (
    {
      className,
      isReverse,
      isVertical = false,
      gap = '1rem',
      showShadow = true,
      shouldPauseOnHover = true,
      duration = 40,
      children,
      style,
      opacity,
      ...props
    },
    ref,
  ) => {
    const shadowProps: ScrollShadowProps = {
      isEnabled: showShadow,
      offset: -20,
      size: 300,
      orientation: isVertical ? 'vertical' : 'horizontal',
      visibility: 'both',
      ...props,
    }

    return (
      <ScrollShadow
        {...shadowProps}
        ref={ref}
        className={cn(
          'flex',
          {
            'w-full': !isVertical,
            'overflow-y-hidden': isVertical,
            'overflow-x-hidden': !isVertical,
            'max-h-[calc(100vh_-_200px)]': isVertical,
          },
          className,
        )}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          '--gap': gap,
          '--duration': `${duration}s`,
          ...style,
        }}
      >
        <div
          className={cn(`flex w-max items-stretch ${opacity ? opacity : 'opacity-40'}`, {
            'flex-col': isVertical,
            'h-full': isVertical,
            'animate-scrolling-banner': !isVertical,
            'animate-scrolling-banner-vertical': isVertical,
            '[animation-direction:reverse]': isReverse,
            'hover:[animation-play-state:paused]': shouldPauseOnHover,
          })}
          style={{ gridGap: gap }}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {Children.map(children, (child) => cloneElement(child as any))}
        </div>
      </ScrollShadow>
    )
  },
)

ScrollerComponent.displayName = 'ScrollerComponent'

export default ScrollerComponent
