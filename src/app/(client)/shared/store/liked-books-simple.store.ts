'use client'

import { useCallback, useEffect, useState } from 'react'

import type { IOpenLibraryBook } from '@/client/entities/api/openlibrary'

interface LikedBook {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  likedAt: string
}

const STORAGE_KEY = 'liked-books-storage'

let likedBooks: LikedBook[] = []
let listeners: (() => void)[] = []

if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      likedBooks = JSON.parse(stored)
    }
  } catch (error) {
    console.warn('Failed to load liked books from localStorage:', error)
  }
}

const saveToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedBooks))
    } catch (error) {
      console.warn('Failed to save liked books to localStorage:', error)
    }
  }
}

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

const toggleLike = (book: IOpenLibraryBook) => {
  const isCurrentlyLiked = likedBooks.some((likedBook) => likedBook.key === book.key)

  if (isCurrentlyLiked) {
    likedBooks = likedBooks.filter((likedBook) => likedBook.key !== book.key)
  } else {
    const likedBook: LikedBook = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      likedAt: new Date().toISOString(),
    }
    likedBooks = [likedBook, ...likedBooks]
  }

  saveToStorage()
  notifyListeners()
}

const isLiked = (bookKey: string) => {
  return likedBooks.some((book) => book.key === bookKey)
}

const getLikedBooks = () => {
  return [...likedBooks]
}

const clearLikedBooks = () => {
  likedBooks = []
  saveToStorage()
  notifyListeners()
}

export const useLikedBooksStore = () => {
  const [, forceUpdate] = useState({})

  const rerender = useCallback(() => {
    forceUpdate({})
  }, [])

  useEffect(() => {
    listeners.push(rerender)
    return () => {
      listeners = listeners.filter((listener) => listener !== rerender)
    }
  }, [rerender])

  return {
    likedBooks: getLikedBooks(),
    isLiked,
    toggleLike,
    getLikedBooks,
    clearLikedBooks,
  }
}
