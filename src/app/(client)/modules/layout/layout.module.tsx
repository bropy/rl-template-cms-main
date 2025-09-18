import { type FC, type ReactNode } from 'react'

import { FooterComponent } from '@/app/(client)/widgets/footer'
import { HeaderComponent } from '@/app/(client)/widgets/header'

// interface
interface IProps {
  children: ReactNode
}

// component
const LayoutModule: FC<Readonly<IProps>> = async (props) => {
  const { children } = props

  // return
  return (
    <>
      <HeaderComponent />

      {children}

      <FooterComponent />
    </>
  )
}

export default LayoutModule
