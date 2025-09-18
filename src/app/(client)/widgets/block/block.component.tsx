'use client'

import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'
import { type FC, Fragment } from 'react'

import { useQuery } from '@tanstack/react-query'

import { pagesQueryOptions } from '@/client/entities/api/page'

const CategoriesBlockComponent = dynamic(() =>
  import('@/client/features/block').then((m) => m.CategoriesBlockComponent),
)
const FeedbackBlockComponent = dynamic(() => import('@/client/features/block').then((m) => m.FeedbackBlockComponent))
const HeroBlockComponent = dynamic(() => import('@/client/features/block').then((m) => m.HeroBlockComponent))
const ImageScrollerBlockComponent = dynamic(() =>
  import('@/client/features/block').then((m) => m.ImageScrollerBlockComponent),
)
const ListBlockComponent = dynamic(() => import('@/client/features/block').then((m) => m.ListBlockComponent))
const TabsBlockComponent = dynamic(() => import('@/client/features/block').then((m) => m.TabsBlockComponent))
const SectionBlockComponent = dynamic(() => import('@/client/features/block').then((m) => m.SectionBlockComponent))

// interface
interface IProps {
  pageSlug: string
}

// component
const BlockComponent: FC<Readonly<IProps>> = (props) => {
  const { pageSlug } = props

  const locale = useLocale()

  const { data, isLoading } = useQuery(pagesQueryOptions({ pageSlug, locale }))

  // return
  return (
    <>
      {data?.blocks?.map((block) => (
        <Fragment key={`${block?.id}-block`}>
          {block?.blockType === 'heroBlock' && (
            <HeroBlockComponent key={`${block?.id}-${block?.blockType}-block`} data={block} isLoading={isLoading} />
          )}

          {block?.blockType === 'sectionBlock' && (
            <SectionBlockComponent key={`${block?.id}-${block?.blockType}-block`} data={block} isLoading={isLoading} />
          )}

          {block?.blockType === 'imageScrollerBlock' && (
            <ImageScrollerBlockComponent
              key={`${block?.id}-${block?.blockType}-block`}
              data={block}
              isLoading={isLoading}
            />
          )}

          {block?.blockType === 'listBlock' && (
            <ListBlockComponent key={`${block?.id}-${block?.blockType}-block`} data={block} isLoading={isLoading} />
          )}

          {block?.blockType === 'tabsBlock' && (
            <TabsBlockComponent key={`${block?.id}-${block?.blockType}-block`} data={block} isLoading={isLoading} />
          )}

          {block?.blockType === 'categoriesBlock' && (
            <CategoriesBlockComponent
              key={`${block?.id}-${block?.blockType}-block`}
              data={block}
              isLoading={isLoading}
            />
          )}

          {block?.blockType === 'feedbackBlock' && (
            <FeedbackBlockComponent key={`${block?.id}-${block?.blockType}-block`} data={block} isLoading={isLoading} />
          )}

          {block?.blockType === 'templateBlock' &&
            block?.template?.blocks?.map((template) => (
              <Fragment key={`${block?.id}-${template?.id}-${template?.blockType}-block`}>
                {template?.blockType === 'heroBlock' && (
                  <HeroBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'sectionBlock' && (
                  <SectionBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'imageScrollerBlock' && (
                  <ImageScrollerBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'listBlock' && (
                  <ListBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'tabsBlock' && (
                  <TabsBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'categoriesBlock' && (
                  <CategoriesBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}

                {template?.blockType === 'feedbackBlock' && (
                  <FeedbackBlockComponent
                    key={`${template?.id}-${template?.blockType}-block`}
                    data={template}
                    isLoading={isLoading}
                  />
                )}
              </Fragment>
            ))}
        </Fragment>
      ))}
    </>
  )
}

export default BlockComponent
