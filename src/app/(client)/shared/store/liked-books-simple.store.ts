import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { IOpenLibraryBook } from '@/client/entities/api/openlibrary'

export interface LikedBook {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  likedAt: string
}

interface LikedBooksState {
  likedBooks: LikedBook[]
}

interface LikedBooksActions {
  toggleLike: (book: IOpenLibraryBook) => void
  isLiked: (bookKey: string) => boolean
  getLikedBooks: () => LikedBook[]
  clearLikedBooks: () => void
}

interface LikedBooksStore extends LikedBooksState, LikedBooksActions {}

export const useLikedBooksStore = create<LikedBooksStore>()(
  devtools(
    persist(
      (set, get) => ({
        likedBooks: [],

        toggleLike: (book: IOpenLibraryBook) => {
          const { likedBooks } = get()
          const isCurrentlyLiked = likedBooks.some((likedBook) => likedBook.key === book.key)

          if (isCurrentlyLiked) {
            set({
              likedBooks: likedBooks.filter((likedBook) => likedBook.key !== book.key),
            })
          } else {
            const likedBook: LikedBook = {
              key: book.key,
              title: book.title,
              author_name: book.author_name,
              cover_i: book.cover_i,
              first_publish_year: book.first_publish_year,
              likedAt: new Date().toISOString(),
            }
            set({
              likedBooks: [likedBook, ...likedBooks],
            })
          }
        },

        isLiked: (bookKey: string) => {
          const { likedBooks } = get()
          return likedBooks.some((book) => book.key === bookKey)
        },

        getLikedBooks: () => {
          const { likedBooks } = get()
          return [...likedBooks]
        },

        clearLikedBooks: () => {
          set({ likedBooks: [] })
        },
      }),
      {
        name: 'liked-books-storage',
        partialize: (state) => ({ likedBooks: state.likedBooks }),
      },
    ),
    {
      name: 'liked-books-store',
      enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined',
    },
  ),
)
