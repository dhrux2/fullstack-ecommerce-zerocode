import React from 'react'
import { ProductDetailSkeleton } from '@/components/Skeleton'

export default function ProductDetailLoading() {
  return (
    <div className="bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)]">
      <ProductDetailSkeleton />
    </div>
  )
}
