'use client'

import { useSearchParams } from 'next/navigation'

import { usePathname, useRouter } from '@/pkg/libraries/locale'

// hook
export const useQueryParams = () => {
  const { push } = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hash = typeof window !== 'undefined' ? window.location.hash : null
  const hashParams = new URLSearchParams(hash?.slice(1))

  const changeQuery = (queries: { name: string; value?: string }[], scroll?: boolean) => {
    const params = new URLSearchParams(searchParams)

    for (const param of queries) {
      if (param.value) {
        params.set(param.name, param.value)
      } else {
        params.delete(param.name)
      }
    }

    const queryString = params.toString()
    push(pathname + (queryString ? '?' + queryString : ''), { scroll: !scroll })
  }

  const allQueriesParams = String(new URLSearchParams(searchParams))

  // return
  return { push, searchParams, allQueriesParams, changeQuery, hashParams }
}
