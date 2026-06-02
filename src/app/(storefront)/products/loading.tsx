import React from 'react'
import { ProductSkeleton } from '@/components/Skeleton'

export default function ProductsLoading() {
  return (
    <div className="bg-[var(--color-primary-light)] min-h-screen pt-32 pb-40 px-6 lg:px-12 text-[var(--color-primary-dark)]">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-24 text-center md:text-left">
          <h1 className="font-thunder text-fluid-display mb-4 uppercase text-[var(--color-primary-dark)]">
            SHOP ESSENTIALS
          </h1>
          <p className="font-nohemi text-sm md:text-base text-[var(--color-sec-600)] uppercase tracking-widest font-bold">
            Loading collection...
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
