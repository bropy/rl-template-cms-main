'use client'

import { FC, useEffect } from 'react'
import { scan } from 'react-scan'

// interface
interface IProps {}

const isDev = process.env.NODE_ENV !== 'production'

// component
const ScanComponent: FC<Readonly<IProps>> = () => {
  useEffect(() => {
    if (isDev) {
      scan({
        showToolbar: isDev,
        enabled: isDev,
      })
    }
  }, [])

  // return
  return null
}

export default ScanComponent
