interface IStat {
  id: string
  label: string
  value: string
  description: string
  icon: string
  trend?: {
    value: string
    isPositive: boolean
  }
}
export const libraryStats: IStat[] = [
  {
    id: '1',
    label: 'Total Books',
    value: '12,847',
    description: 'Books in our collection',
    icon: '📚',
    trend: {
      value: '+234',
      isPositive: true,
    },
  },
  {
    id: '2',
    label: 'Active Members',
    value: '3,256',
    description: 'Registered library members',
    icon: '👥',
    trend: {
      value: '+89',
      isPositive: true,
    },
  },
  {
    id: '3',
    label: 'Books Borrowed',
    value: '8,492',
    description: 'This month',
    icon: '📖',
    trend: {
      value: '+12%',
      isPositive: true,
    },
  },
  {
    id: '4',
    label: 'Digital Resources',
    value: '4,123',
    description: 'E-books and audiobooks',
    icon: '💻',
    trend: {
      value: '+67',
      isPositive: true,
    },
  },
]
