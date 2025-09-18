import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IOpenLibraryBook } from '@/client/entities/api/openlibrary'

interface LikedBook {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  likedAt: string
}

interface LikedBooksState {
  likedBooks: LikedBook[]
  isLiked: (bookKey: string) => boolean
  toggleLike: (book: IOpenLibraryBook) => void
  getLikedBooks: () => LikedBook[]
  clearLikedBooks: () => void
}

export const useLikedBooksStore = create<LikedBooksState>()(
  persist(
    (set, get) => ({
      likedBooks: [],

      isLiked: (bookKey: string) => {
        return get().likedBooks.some((book) => book.key === bookKey)
      },

      toggleLike: (book: IOpenLibraryBook) => {
        const { likedBooks } = get()
        const isCurrentlyLiked = likedBooks.some((likedBook) => likedBook.key === book.key)

        if (isCurrentlyLiked) {
          // Remove from liked books
          set({
            likedBooks: likedBooks.filter((likedBook) => likedBook.key !== book.key),
          })
        } else {
          // Add to liked books
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

      getLikedBooks: () => {
        return get().likedBooks
      },

      clearLikedBooks: () => {
        set({ likedBooks: [] })
      },
    }),
    {
      name: 'liked-books-storage',
      version: 1,
    },
  ),
)
