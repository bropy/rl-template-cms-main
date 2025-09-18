import { queryOptions } from '@tanstack/react-query'

import { openLibraryApi } from './openlibrary.api'

// Query keys for better cache management
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

// Book search query options
export const bookSearchQueryOptions = (query: string, limit: number = 20, offset: number = 0) =>
  queryOptions({
    queryKey: openLibraryKeys.bookSearch(query, limit, offset),
    queryFn: () => openLibraryApi.searchBooks(query, limit, offset),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

// Author search query options
export const authorSearchQueryOptions = (query: string, limit: number = 20, offset: number = 0) =>
  queryOptions({
    queryKey: openLibraryKeys.authorSearch(query, limit, offset),
    queryFn: () => openLibraryApi.searchAuthors(query, limit, offset),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

// Get specific work query options
export const workQueryOptions = (workKey: string) =>
  queryOptions({
    queryKey: openLibraryKeys.work(workKey),
    queryFn: () => openLibraryApi.getWork(workKey),
    enabled: !!workKey,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })

// Get author details query options
export const authorQueryOptions = (authorKey: string) =>
  queryOptions({
    queryKey: openLibraryKeys.author(authorKey),
    queryFn: () => openLibraryApi.getAuthor(authorKey),
    enabled: !!authorKey,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })

// Get author works query options
export const authorWorksQueryOptions = (authorKey: string, limit: number = 50, offset: number = 0) =>
  queryOptions({
    queryKey: openLibraryKeys.authorWorks(authorKey, limit, offset),
    queryFn: () => openLibraryApi.getAuthorWorks(authorKey, limit, offset),
    enabled: !!authorKey,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
