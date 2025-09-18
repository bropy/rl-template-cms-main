'use client'

import { useLocale } from 'next-intl'
import { type FC, Fragment } from 'react'

import { Navbar, NavbarContent, NavbarMenuToggle } from '@heroui/navbar'
import { useQuery } from '@tanstack/react-query'

import { layoutQueryOptions } from '@/client/entities/api/layout'
import { useGlobalStore } from '@/client/shared/store/global.store'
import { ActionComponent } from '@/client/shared/ui/action'
import { LogoComponent } from '@/client/shared/ui/logo'

// interface
interface IProps {}

// component
const HeaderComponent: FC<Readonly<IProps>> = () => {
  const locale = useLocale()

  const { data } = useQuery(layoutQueryOptions({ locale }))

  const headerBlock = data?.headerBlock

  const menu = useGlobalStore((s) => s.menu)
  const handleGlobalStore = useGlobalStore((s) => s.handleGlobalStore)

  // return
  return (
    <Navbar
      isMenuOpen={menu}
      onMenuOpenChange={() => handleGlobalStore({ menu: !menu })}
      classNames={{
        base: `w-auto backdrop-blur-lg bg-background/55 transition-shadow transition-background border-b border-divider`,
        wrapper: `z-49 grid max-w-screen-lg h-[60px] items-center grid-cols-[0.5fr_0.1fr_0.5fr] sm:grid-cols-[0.5fr_1fr_0.5fr] py-0 w-full px-6`,
      }}
    >
      <NavbarContent justify='start'>
        <LogoComponent
          src={data?.branding?.logoImage?.url}
          iconSvg={data?.branding?.logoIconSvg}
          isIconSvg={data?.branding?.logoAsIconSvg}
          w={110}
          h={50}
        />
      </NavbarContent>

      <NavbarContent justify='center' />

      <NavbarContent className='gap-4 md:gap-2' justify='end'>
        {/* <SelectThemeComponent className='hidden sm:flex' /> */}

        {headerBlock?.actions?.map((button, index) => (
          <Fragment key={`${button?.id}-${index}-action-fragment`}>
            <ActionComponent {...button} className='hidden md:flex' />
          </Fragment>
        ))}

        <NavbarMenuToggle aria-label={menu ? 'Close menu' : 'Open menu'} className='md:hidden' />
      </NavbarContent>
    </Navbar>
  )
}

export default HeaderComponent
