'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function FilterPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // State local states
  const activeCategory = searchParams.get('category') || ''
  const activeSize = searchParams.get('size') || ''
  const activeSearch = searchParams.get('search') || ''
  const activePrice = searchParams.get('priceRange') || ''

  const [searchInput, setSearchInput] = useState(activeSearch)

  const categories = ['Tops', 'Outerwear', 'Bottoms', 'Accessories']
  const sizes = ['S', 'M', 'L', 'XL']
  const priceRanges = [
    { label: 'UNDER ₹2000', value: '0-2000' },
    { label: '₹2000 - ₹3500', value: '2000-3500' },
    { label: 'OVER ₹3500', value: '3500-10000' },
  ]

  // Update query state helper
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Always reset search if changing category/sizes to prevent empty overlaps
    if (key !== 'search' && params.has('search')) {
      // Keep search or delete depending on flows
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`)
    })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQuery('search', searchInput)
  }

  const clearAll = () => {
    setSearchInput('')
    startTransition(() => {
      router.push('/products')
    })
  }

  const hasFilters = activeCategory || activeSize || activeSearch || activePrice

  const uiFont = { fontFamily: 'var(--font-ui), sans-serif', letterSpacing: '0.08em' } as const

  return (
    <div className="w-full space-y-8 bg-[#FFFFFF] p-6 subtle-border">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="space-y-2">
        <h4
          className="text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A] uppercase"
          style={uiFont}
        >
          SEARCH
        </h4>
        <div className="flex border border-[#0A0A0A] bg-[#F5F4F0]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ENTER SEARCH QUERY..."
            className="w-full bg-transparent px-3 py-2 text-[9px] font-semibold tracking-wider text-[#0A0A0A] placeholder-[#6B6B6B] focus:outline-none"
            style={uiFont}
          />
          <button
            type="submit"
            className="bg-[#0A0A0A] px-4 text-[9px] font-bold text-[#F5F4F0] hover:bg-[#C8372D]"
            style={uiFont}
          >
            GO
          </button>
        </div>
      </form>

      {/* Category List */}
      <div className="space-y-3">
        <h4
          className="text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A] uppercase"
          style={uiFont}
        >
          CATEGORIES
        </h4>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => updateQuery('category', '')}
            className={`text-left text-[9px] font-semibold tracking-widest uppercase py-1 ${
              !activeCategory ? 'text-[#C8372D] underline' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
            }`}
            style={uiFont}
          >
            ALL CATEGORIES
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateQuery('category', cat)}
              className={`text-left text-[9px] font-semibold tracking-widest uppercase py-1 ${
                activeCategory === cat ? 'text-[#C8372D] underline' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
              }`}
              style={uiFont}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size Matrix Grid */}
      <div className="space-y-3">
        <h4
          className="text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A] uppercase"
          style={uiFont}
        >
          SIZES
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((sz) => {
            const isSelected = activeSize === sz
            return (
              <button
                key={sz}
                onClick={() => updateQuery('size', isSelected ? '' : sz)}
                className={`flex h-8 items-center justify-center text-[9px] font-bold border transition-colors ${
                  isSelected
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F4F0]'
                    : 'border-[#E8E5DE] bg-transparent text-[#0A0A0A] hover:border-[#0A0A0A]'
                }`}
                style={uiFont}
              >
                {sz}
              </button>
            )
          })}
        </div>
      </div>

      {/* Price filter list */}
      <div className="space-y-3">
        <h4
          className="text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A] uppercase"
          style={uiFont}
        >
          PRICE LIMITS
        </h4>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => updateQuery('priceRange', '')}
            className={`text-left text-[9px] font-semibold tracking-widest uppercase py-1 ${
              !activePrice ? 'text-[#C8372D] underline' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
            }`}
            style={uiFont}
          >
            ALL PRICES
          </button>
          {priceRanges.map((pr) => (
            <button
              key={pr.value}
              onClick={() => updateQuery('priceRange', pr.value)}
              className={`text-left text-[9px] font-semibold tracking-widest uppercase py-1 ${
                activePrice === pr.value ? 'text-[#C8372D] underline' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
              }`}
              style={uiFont}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Button */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full bg-[#C8372D] py-3 text-center text-[8px] font-bold tracking-[0.2em] text-[#FFFFFF] hover:bg-[#0A0A0A] transition-colors uppercase"
          style={uiFont}
        >
          CLEAR ALL FILTERS
        </button>
      )}

      {/* Pending status loading strip */}
      {isPending && (
        <div className="text-center">
          <span
            className="text-[8px] font-semibold tracking-widest text-[#B8B5AD] animate-pulse uppercase"
            style={uiFont}
          >
            UPDATING VIEW...
          </span>
        </div>
      )}
    </div>
  )
}
