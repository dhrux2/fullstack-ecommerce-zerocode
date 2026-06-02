"use client"

import { useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import Link from 'next/link'
import { useGsapReveal } from '@/hooks/useGsapReveal'

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)
  useGsapReveal('.reveal-el')

  useEffect(() => {
    // Clear the cart when the user lands on the success page
    clearCart()
  }, [clearCart])

  return (
    <div className="w-full bg-[var(--color-primary-dark)] min-h-screen text-[var(--color-primary-light)] pt-40 pb-40 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto reveal-el">
        <h1 className="font-thunder uppercase text-7xl md:text-9xl tracking-wide mb-6">
          Order Confirmed
        </h1>
        <p className="font-nohemi text-lg md:text-xl text-[var(--color-sec-400)] mb-12">
          Thank you for your purchase. We've received your order and are preparing it for shipment. A confirmation email will be sent to you shortly.
        </p>
        
        <Link 
          href="/products" 
          className="inline-block border border-[var(--color-primary-light)] rounded-full px-12 py-4 font-outfit text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary-dark)] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
