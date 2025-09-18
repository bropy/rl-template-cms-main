'use client'
import { type FC, useState } from 'react'

import {
  BookSearchComponent,
  LibraryCommentsComponent,
  type LibraryFeedback,
  LibraryFeedbackComponent,
  LikedBooksComponent,
  PopularBooksComponent,
} from '@/client/features/library'
import { ContainerComponent } from '@/client/shared/ui/container'

// interface
interface IProps {
  pageSlug: string
}

// component
const HomeModule: FC<Readonly<IProps>> = () => {
  const [comments, setComments] = useState<LibraryFeedback[]>([])

  const handleFeedbackSubmit = (feedback: LibraryFeedback) => {
    setComments((prev) => [feedback, ...prev])
  }

  // return
  return (
    <ContainerComponent className='w-full space-y-12 pb-[72px]'>
      {/* Popular Books - Cached with 30s revalidation */}
      <PopularBooksComponent />

      {/* Book Search */}
      <BookSearchComponent />

      {/* Community Comments */}
      {comments.length > 0 && <LibraryCommentsComponent comments={comments} />}

      {/* Library Feedback Form */}
      <LibraryFeedbackComponent onSubmit={handleFeedbackSubmit} />

      {/* My Liked Books - At the bottom */}
      <LikedBooksComponent />
    </ContainerComponent>
  )
}

export default HomeModule
