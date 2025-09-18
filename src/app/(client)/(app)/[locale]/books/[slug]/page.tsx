import { type FC } from 'react'

import { BookDetailModule } from '@/client/modules/book-detail'

interface IProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

const BookDetailPage: FC<Readonly<IProps>> = ({ params }) => {
  return <BookDetailModule params={params} />
}

export default BookDetailPage
