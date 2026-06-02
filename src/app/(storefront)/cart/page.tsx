"use client"

import { useCartStore } from '@/store/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore()
  useGsapReveal('.reveal-el')
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    setCheckoutError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        setCheckoutError(data.error || 'Failed to initialize checkout.')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      setCheckoutError('Network error connecting to checkout gateway.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-[100dvh] pt-32 pb-40 px-6 lg:px-12 text-[var(--color-primary-dark)]">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-24 reveal-el text-center md:text-left">
          <h1 className="font-thunder text-fluid-display mb-4 uppercase">YOUR BAG</h1>
          <p className="font-nohemi text-sm md:text-base text-[var(--color-sec-600)] uppercase tracking-widest font-bold">
            {totalItems()} {totalItems() === 1 ? 'Item' : 'Items'}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 reveal-el">
            <p className="font-outfit text-2xl md:text-3xl text-[var(--color-sec-400)] mb-8">Your bag is empty.</p>
            <Link 
              href="/products" 
              className="inline-block border border-[var(--color-primary-dark)] rounded-full px-10 py-4 font-outfit text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-primary-light)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 reveal-el">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3 flex flex-col gap-12">
              {items.map((item) => (
                <div key={item.id} className="flex gap-8 group">
                  <div className="relative w-32 md:w-48 aspect-[3/4] bg-[var(--color-sec-200)] overflow-hidden rounded-lg shrink-0">
                    <Image
                      src={item.primaryImage}
                      alt={item.name}
                      fill
                      className="object-cover select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-2 w-full">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-outfit text-2xl md:text-3xl tracking-wide text-[var(--color-primary-dark)]">
                          {item.name}
                        </h3>
                        <p className="font-nohemi text-lg font-bold text-[var(--color-primary-dark)]">
                          <span className="font-sans">₹</span>{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(item.price)}
                        </p>
                      </div>
                      <p className="font-nohemi text-sm md:text-base text-[var(--color-sec-600)]">
                        Size: {item.size}
                      </p>
                      <div className="font-nohemi text-sm md:text-base text-[var(--color-sec-600)] flex items-center gap-4 mt-1">
                        <span>Qty:</span>
                        <div className="flex items-center gap-3 border border-[var(--color-sec-600)] rounded-full px-3 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="hover:text-[var(--color-accent)] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="font-bold min-w-[1.2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="hover:text-[var(--color-accent)] transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="self-start font-outfit text-xs tracking-[0.2em] uppercase text-[var(--color-sec-400)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] p-10 rounded-2xl sticky top-32 shadow-2xl">
                <h2 className="font-outfit text-xl tracking-widest uppercase mb-8 pb-8 border-b border-[var(--color-sec-800)]">
                  Summary
                </h2>
                
                <div className="space-y-4 mb-8 font-nohemi text-sm text-[var(--color-sec-400)]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold"><span className="font-sans">₹</span>{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10 pt-8 border-t border-[var(--color-sec-800)]">
                  <span className="font-outfit tracking-widest uppercase text-sm">Total</span>
                  <span className="font-nohemi text-2xl font-bold"><span className="font-sans">₹</span>{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(totalPrice())}</span>
                </div>

                {checkoutError && (
                  <div className="mb-6 p-4 border border-[var(--color-accent)] bg-[#C8372D]/10 text-[var(--color-accent)] rounded-lg text-sm font-outfit tracking-wider uppercase text-center">
                    {checkoutError}
                  </div>
                )}
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] font-outfit text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-white)] hover:-translate-y-1 transition-all duration-300 shadow-xl disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
