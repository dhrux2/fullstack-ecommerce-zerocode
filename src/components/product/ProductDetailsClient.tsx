'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { ShoppingBag } from 'lucide-react'

interface ProductDetailsClientProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    primaryImage: string
    hoverImage: string
    sizes: string[]
    category: string
    stock: number
  }
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToBag = () => {
    setErrorMsg('')
    setSuccessMsg('')

    if (!selectedSize) {
      setErrorMsg('PLEASE SELECT A SIZE BEFORE ADDING TO BAG.')
      return
    }

    if (product.stock === 0) {
      setErrorMsg('THIS ITEM IS CURRENTLY OUT OF STOCK.')
      return
    }

    // Add to Zustand Cart
    addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        primaryImage: product.primaryImage,
        size: selectedSize,
        stock: product.stock,
      },
      1
    )

    setSuccessMsg(`${product.name} (SIZE ${selectedSize}) HAS BEEN ADDED TO YOUR BAG.`)
    
    // Auto clear notification after 4 seconds
    setTimeout(() => {
      setSuccessMsg('')
    }, 4000)
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Alerts */}
      {errorMsg && (
        <div className="bg-[#C8372D]/10 border border-[#C8372D] p-4">
          <span 
            className="text-[10px] font-bold text-[#C8372D] uppercase block"
            style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
          >
            {errorMsg}
          </span>
        </div>
      )}

      {successMsg && (
        <div className="bg-[#8B6914]/10 border border-[#8B6914] p-4 animate-fade-in">
          <span 
            className="text-[10px] font-bold text-[#8B6914] uppercase block"
            style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
          >
            {successMsg}
          </span>
        </div>
      )}

      {/* Product Title and Price */}
      <div className="border-b border-[#E8E5DE] pb-6 space-y-2">
        <span 
          className="text-[9px] font-bold text-[#6B6B6B] uppercase block"
          style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
        >
          {product.category}
        </span>
        <h1 
          className="text-4xl md:text-5xl text-[#0A0A0A] uppercase"
          style={{ 
            fontFamily: 'var(--font-display), sans-serif', 
            fontWeight: 900, 
            fontStyle: 'italic', 
            letterSpacing: '-0.02em', 
            lineHeight: 0.85 
          }}
        >
          {product.name}
        </h1>
        <p 
          className="text-lg font-bold text-[#0A0A0A] uppercase"
          style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
        >
          ₹{product.price}
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 
          className="text-[10px] font-bold text-[#6B6B6B] uppercase"
          style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
        >
          PRODUCT SPECIFICATIONS
        </h4>
        <p 
          className="text-[12px] text-[#2C2C2C] max-w-lg"
          style={{ 
            fontFamily: 'var(--font-body), sans-serif', 
            fontWeight: 300, 
            letterSpacing: '0.01em', 
            lineHeight: 1.75 
          }}
        >
          {product.description}
        </p>
      </div>

      {/* Size Selector Matrix */}
      <div className="space-y-4">
        <div className="flex justify-between items-center max-w-sm">
          <h4 
            className="text-[10px] font-bold text-[#6B6B6B] uppercase"
            style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
          >
            SELECT SIZE
          </h4>
          <span 
            className="text-[9px] font-semibold text-[#6B6B6B] underline cursor-pointer"
            style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
          >
            SIZE GUIDE
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 max-w-sm">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                disabled={product.stock === 0}
                onClick={() => setSelectedSize(size)}
                className={`flex h-12 items-center justify-center text-[10px] font-bold border transition-colors ${
                  product.stock === 0 ? 'opacity-40 cursor-not-allowed border-[#E8E5DE]' : ''
                } ${
                  isSelected
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F4F0]'
                    : 'border-[#E8E5DE] bg-[#FFFFFF] text-[#0A0A0A] hover:border-[#0A0A0A]'
                }`}
                style={{
                  fontFamily: 'var(--font-ui), sans-serif',
                  letterSpacing: '0.08em'
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 max-w-sm">
        <button
          onClick={handleAddToBag}
          disabled={product.stock === 0}
          className="flex w-full items-center justify-center space-x-3 bg-[#0A0A0A] py-4 text-[10px] font-bold text-[#F5F4F0] transition-colors hover:bg-[#C8372D] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={{
            fontFamily: 'var(--font-ui), sans-serif',
            letterSpacing: '0.08em'
          }}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{product.stock === 0 ? 'SOLD OUT' : 'ADD TO BAG'}</span>
        </button>
      </div>

      {/* Stock warning */}
      {product.stock > 0 && product.stock <= 5 && (
        <span 
          className="block text-[9px] font-bold text-[#C8372D]"
          style={{ fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' }}
        >
          WARNING: ONLY {product.stock} ITEMS REMAINING IN LOCAL STOCK.
        </span>
      )}
    </div>
  )
}

