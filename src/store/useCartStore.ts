import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string // Composite unique key: productId + '-' + size
  productId: string
  name: string
  slug: string
  price: number
  primaryImage: string
  size: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (item, quantity = 1) => {
        const { items } = get()
        const id = `${item.productId}-${item.size}`
        const existingItem = items.find((i) => i.id === id)

        let newItems;
        if (existingItem) {
          const newQty = Math.min(existingItem.quantity + quantity, item.stock)
          newItems = items.map((i) =>
            i.id === id ? { ...i, quantity: newQty } : i
          )
        } else {
          newItems = [
            ...items,
            {
              ...item,
              id,
              quantity: Math.min(quantity, item.stock),
            },
          ]
        }
        set({ items: newItems, isCartOpen: true })
        fetch('/api/cart/sync', { method: 'POST', body: JSON.stringify({ items: newItems }) }).catch(() => {})
      },

      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id)
        set({ items: newItems })
        fetch('/api/cart/sync', { method: 'POST', body: JSON.stringify({ items: newItems }) }).catch(() => {})
      },

      updateQuantity: (id, quantity) => {
        const { items } = get()
        const item = items.find((i) => i.id === id)
        if (!item) return

        const newQty = Math.min(Math.max(1, quantity), item.stock)
        const newItems = items.map((i) =>
          i.id === id ? { ...i, quantity: newQty } : i
        )
        set({ items: newItems })
        fetch('/api/cart/sync', { method: 'POST', body: JSON.stringify({ items: newItems }) }).catch(() => {})
      },

      clearCart: () => {
        set({ items: [] })
        fetch('/api/cart/sync', { method: 'POST', body: JSON.stringify({ items: [] }) }).catch(() => {})
      },

      totalItems: () => {
        const { items } = get()
        return items.reduce((acc, item) => acc + item.quantity, 0)
      },

      totalPrice: () => {
        const { items } = get()
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'zero-code-cart-storage',
      // Only persist the items array, NOT the isCartOpen UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
)
