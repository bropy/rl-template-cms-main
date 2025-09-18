import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'
import { getLangDir } from 'rtl-detect'

import { HydrationBoundary } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'

import { layoutQueryOptions } from '@/client/entities/api/layout'
import { LayoutModule } from '@/client/modules/layout'
import { EAssetImage } from '@/client/shared/assets/interface'
import { envClient, envServer } from '@/config/env'
import { mainFont } from '@/config/fonts'
import { routing } from '@/pkg/libraries/locale/routing'
import { RestApiProvider } from '@/pkg/libraries/rest-api'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { ScanComponent } from '@/pkg/libraries/scan'
import { UiProvider } from '@/pkg/libraries/ui'

import '@/config/styles/global.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

// generate static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale } = await props.params

  const clientQuery = getQueryClient()
  const data = await clientQuery.fetchQuery(layoutQueryOptions({ locale }))

  const favicon = data?.branding?.favicon?.url || EAssetImage.FAVICON
  const title = data?.meta?.title || 'Website'
  const description = data?.meta?.description || 'Website'
  const ogImage = data?.meta?.image?.url || EAssetImage.OG_IMAGE

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),
    icons: { icon: favicon },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `${title} | %s`,
      },
      description: description,
      siteName: title,
      type: 'website',
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
  }
}

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const direction = getLangDir(locale)

  const clientQuery = getQueryClient()
  await clientQuery.prefetchQuery(layoutQueryOptions({ locale }))

  // return
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      {envServer.NODE_ENV !== 'production' && <ScanComponent />}

      <body className={`${mainFont.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider>
          <UiProvider locale={locale}>
            <RestApiProvider>
              <HydrationBoundary state={dehydrate(clientQuery)}>
                <LayoutModule>{children}</LayoutModule>
              </HydrationBoundary>
            </RestApiProvider>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
