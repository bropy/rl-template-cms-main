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
      <PopularBooksComponent />

      <BookSearchComponent />

      {comments.length > 0 && <LibraryCommentsComponent comments={comments} />}

      <LibraryFeedbackComponent onSubmit={handleFeedbackSubmit} />

      <LikedBooksComponent />
    </ContainerComponent>
  )
}

export default HomeModule
