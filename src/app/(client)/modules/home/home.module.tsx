'use client'
import { type FC, useEffect, useState } from 'react'

import {
  BookSearchComponent,
  LibraryCommentsComponent,
  type LibraryFeedback,
  LibraryFeedbackComponent,
  LikedBooksComponent,
  PopularBooksComponent,
} from '@/client/features/library'
import { ContainerComponent } from '@/client/shared/ui/container'
import { showBookSearchFlag } from '@/flags'

interface IProps {
  pageSlug: string
}

const HomeModule: FC<Readonly<IProps>> = () => {
  const [comments, setComments] = useState<LibraryFeedback[]>([])
  const [showBookSearch, setShowBookSearch] = useState(false)

  const handleFeedbackSubmit = (feedback: LibraryFeedback) => {
    setComments((prev) => [feedback, ...prev])
  }

  useEffect(() => {
    const loadFeatureFlag = async () => {
      try {
        const enabled = await showBookSearchFlag()
        setShowBookSearch(enabled)
      } catch (_error) {
        setShowBookSearch(false)
      }
    }

    loadFeatureFlag()

    const handleFocus = () => {
      loadFeatureFlag()
    }

    window.addEventListener('focus', handleFocus)
    const interval = setInterval(loadFeatureFlag, 30000)

    return () => {
      window.removeEventListener('focus', handleFocus)
      clearInterval(interval)
    }
  }, [])

  // return
  return (
    <ContainerComponent className='w-full space-y-12 pb-[72px]'>
      <PopularBooksComponent />

      {showBookSearch && <BookSearchComponent />}

      {comments.length > 0 && <LibraryCommentsComponent comments={comments} />}

      <LibraryFeedbackComponent onSubmit={handleFeedbackSubmit} />

      <LikedBooksComponent />
    </ContainerComponent>
  )
}

export default HomeModule
