import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[var(--color-sec-200)]",
        className
      )}
      {...props}
    />
  )
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[400px] w-full rounded-xl bg-[var(--color-sec-200)]" />
      <div className="flex justify-between items-start pt-1 px-1">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-1/4 rounded-md" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-12 max-w-screen-xl mx-auto px-6 lg:px-12 pt-32 pb-40">
      <div className="w-full md:w-1/2 flex gap-4">
        <div className="hidden md:flex flex-col gap-4 w-24">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-24 h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="flex-1 aspect-[3/4] md:h-[80vh] rounded-xl" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col pt-8">
        <Skeleton className="h-12 w-3/4 mb-4 rounded-md" />
        <Skeleton className="h-8 w-1/4 mb-8 rounded-md" />
        <Skeleton className="h-32 w-full mb-8 rounded-md" />
        <Skeleton className="h-16 w-full rounded-full" />
      </div>
    </div>
  )
}
