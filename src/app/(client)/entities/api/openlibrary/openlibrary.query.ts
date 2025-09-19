import { queryOptions } from '@tanstack/react-query'

import { openLibraryApi } from './openlibrary.api'

export const openLibraryKeys = {
  all: ['openlibrary'] as const,
  books: () => [...openLibraryKeys.all, 'books'] as const,
  bookSearch: (query: string, limit?: number, offset?: number) =>
    [...openLibraryKeys.books(), 'search', query, limit, offset] as const,
  authors: () => [...openLibraryKeys.all, 'authors'] as const,
  authorSearch: (query: string, limit?: number, offset?: number) =>
    [...openLibraryKeys.authors(), 'search', query, limit, offset] as const,
  author: (authorKey: string) => [...openLibraryKeys.authors(), authorKey] as const,
  authorWorks: (authorKey: string, limit?: number, offset?: number) =>
    [...openLibraryKeys.authors(), authorKey, 'works', limit, offset] as const,
  works: () => [...openLibraryKeys.all, 'works'] as const,
  work: (workKey: string) => [...openLibraryKeys.works(), workKey] as const,
}

export const bookSearchQueryOptions = (query: string, limit: number = 20, offset: number = 0) =>
  queryOptions({
    queryKey: openLibraryKeys.bookSearch(query, limit, offset),
    queryFn: () => openLibraryApi.searchBooks(query, limit, offset),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount) => failureCount < 3,
  })

export const workQueryOptions = (workKey: string) =>
  queryOptions({
    queryKey: openLibraryKeys.work(workKey),
    queryFn: () => openLibraryApi.getWork(workKey),
    enabled: !!workKey,
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: (failureCount) => failureCount < 3,
  })
