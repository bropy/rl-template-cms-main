'use client'

import { useEffect, useRef, useState } from 'react'

// hook
export const useScroll = (triggerValue = 0) => {
  const scrollInit = useRef(false)

  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    if (!scrollInit?.current) {
      scrollInit.current = true

      if (window.scrollY > triggerValue) {
        setIsScroll(true)
      }

      window.onscroll = () => {
        if (window.scrollY > triggerValue) {
          setIsScroll(true)
        } else {
          setIsScroll(false)
        }
      }
    }
  }, [])

  // return
  return isScroll
}
