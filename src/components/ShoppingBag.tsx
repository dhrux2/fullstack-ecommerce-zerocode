"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag as ShoppingBagIcon } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { usePathname } from 'next/navigation'

export default function ShoppingBag() {
  const [mounted, setMounted] = useState(false)
  const { totalItems } = useCartStore()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show on /products and /products/[slug]
  if (!pathname?.startsWith('/products')) {
    return null
  }

  // Determine items count safely after mount
  const itemCount = mounted ? totalItems() : 0

  return (
    <Link
      href="/cart"
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] shadow-2xl hover:bg-[var(--color-accent)] hover:text-[var(--color-white)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group"
      aria-label={`Open bag with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
    >
      <ShoppingBagIcon className="h-6 w-6" strokeWidth={1.8} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-[11px] font-bold text-[var(--color-white)] shadow-lg ring-2 ring-[var(--color-primary-light)]">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
