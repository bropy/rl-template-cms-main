'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'

import { Button } from '@heroui/button'

// interface
interface IProps {
  variant?: 'light' | 'bordered'
  className?: string
}

// component
const SelectThemeComponent: FC<Readonly<IProps>> = (props) => {
  const { variant = 'light', className } = props

  const { theme, setTheme } = useTheme()
  const handleChangeTheme = () => {
    switch (theme) {
      case 'light': {
        setTheme('dark')
        break
      }
      case 'dark': {
        setTheme('light')
        break
      }
    }
  }

  // return
  return (
    <Button onPress={handleChangeTheme} variant={variant} isIconOnly aria-label={'change theme'} className={className}>
      <Moon key={'theme-light'} size={20} className={'dark:hidden'} />

      <Sun key={'theme-dark'} size={20} className={'hidden dark:block'} />
    </Button>
  )
}

export default SelectThemeComponent
