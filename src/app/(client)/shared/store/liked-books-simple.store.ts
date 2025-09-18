'use client'

import { useState, useEffect, useCallback } from 'react'

import type { IOpenLibraryBook } from '@/client/entities/api/openlibrary'

interface LikedBook {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  likedAt: string
}

// Simple localStorage-based store without Zustand
const STORAGE_KEY = 'liked-books-storage'

// Global state
let likedBooks: LikedBook[] = []
let listeners: (() => void)[] = []

// Load from localStorage on initialization
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

// Save to localStorage
const saveToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedBooks))
    } catch (error) {
      console.warn('Failed to save liked books to localStorage:', error)
    }
  }
}

// Notify listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

// Store actions
const toggleLike = (book: IOpenLibraryBook) => {
  const isCurrentlyLiked = likedBooks.some(likedBook => likedBook.key === book.key)

  if (isCurrentlyLiked) {
    // Remove from liked books
    likedBooks = likedBooks.filter(likedBook => likedBook.key !== book.key)
  } else {
    // Add to liked books
    const likedBook: LikedBook = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      likedAt: new Date().toISOString()
    }
    likedBooks = [likedBook, ...likedBooks]
  }
  
  saveToStorage()
  notifyListeners()
}

const isLiked = (bookKey: string) => {
  return likedBooks.some(book => book.key === bookKey)
}

const getLikedBooks = () => {
  return [...likedBooks]
}

const clearLikedBooks = () => {
  likedBooks = []
  saveToStorage()
  notifyListeners()
}

// React hook
export const useLikedBooksStore = () => {
  const [, forceUpdate] = useState({})

  const rerender = useCallback(() => {
    forceUpdate({})
  }, [])

  useEffect(() => {
    listeners.push(rerender)
    return () => {
      listeners = listeners.filter(listener => listener !== rerender)
    }
  }, [rerender])

  return {
    likedBooks: getLikedBooks(),
    isLiked,
    toggleLike,
    getLikedBooks,
    clearLikedBooks
  }
}
