import { create } from 'zustand'

export interface CartItem {
  id: string
  handle: string
  name: string
  price: number
  image: string
  selectedSize: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (entry) => entry.id === item.id && entry.selectedSize === item.selectedSize
      )

      if (existing) {
        return {
          items: state.items.map((entry) =>
            entry.id === item.id && entry.selectedSize === item.selectedSize
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry
          ),
        }
      }

      return { items: [...state.items, item] }
    }),
  removeItem: (id, size) =>
    set((state) => ({
      items: state.items.filter(
        (entry) => !(entry.id === id && entry.selectedSize === size)
      ),
    })),
  updateQuantity: (id, size, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (entry) => !(entry.id === id && entry.selectedSize === size)
          ),
        }
      }

      return {
        items: state.items.map((entry) =>
          entry.id === id && entry.selectedSize === size
            ? { ...entry, quantity }
            : entry
        ),
      }
    }),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))
