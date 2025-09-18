import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// interface
interface IState {
  menu: boolean
}
interface IStore extends IState {
  handleGlobalStore: (value: Partial<IState>) => void
}

// store
export const useGlobalStore = create<IStore>()(
  devtools(
    (set) => ({
      menu: false,
      handleGlobalStore: (value: Partial<IState>) => set((state: IState) => ({ ...state, ...value })),
    }),
    { enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' },
  ),
)
