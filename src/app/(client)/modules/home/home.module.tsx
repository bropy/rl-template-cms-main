import { type FC } from 'react'

import { ContainerComponent } from '@/client/shared/ui/container'
import { FeaturedBooksComponent, BookCategoriesComponent, LibraryStatsComponent } from '@/client/features/library'

// interface
interface IProps {
  pageSlug: string
}

// component
const HomeModule: FC<Readonly<IProps>> = () => {
  // return
  return (
    <ContainerComponent className='w-full space-y-12 pb-[72px]'>
      {/* Library Statistics */}
      <LibraryStatsComponent />

      {/* Featured Books */}
      <FeaturedBooksComponent />

      {/* Book Categories */}
      <BookCategoriesComponent />
    </ContainerComponent>
  )
}

export default HomeModule
