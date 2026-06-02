"use client"

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: Product;
  disableLink?: boolean;
}

export default function ProductCard({ product, disableLink = false }: ProductCardProps) {
  const hoverImageRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  
  const xSet = useRef<any>(null)
  const ySet = useRef<any>(null)

  const hasHover = product.primaryImage !== product.hoverImage

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      if (hasHover && hoverImageRef.current) {
        gsap.set(hoverImageRef.current, { clipPath: 'inset(0% 100% 0% 0%)' })
      }
      if (shimmerRef.current) {
        gsap.set(shimmerRef.current, { left: '0%', opacity: 0 })
      }
      if (cursorRef.current) {
        xSet.current = gsap.quickSetter(cursorRef.current, "x", "px")
        ySet.current = gsap.quickSetter(cursorRef.current, "y", "px")
      }
    })

    mm.add("(max-width: 767px)", () => {
      if (hasHover && hoverImageRef.current) {
        gsap.set(hoverImageRef.current, { clipPath: 'inset(0% 100% 0% 0%)' })
        
        gsap.to(hoverImageRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: hoverImageRef.current.parentElement,
            start: "top 60%",
            end: "top 40%",
            scrub: true
          }
        })
      }
    })

    return () => mm.revert()
  }, [hasHover])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 0-latency instantaneous offset (bottom-right of pointer)
    if (xSet.current) xSet.current(x + 12)
    if (ySet.current) ySet.current(y + 16)
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (cursorRef.current) {
      // Snap to initial position immediately
      gsap.set(cursorRef.current, { x: x + 12, y: y + 16 })
      // Pop in with overwrite to kill any conflicting mouseleave tweens
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', overwrite: true })
    }

    if (!hasHover) return;

    const tl = gsap.timeline({ overwrite: 'auto' })

    // Fast, hard-edge Wipe effect (left to right) - Zero ghosting!
    tl.to(hoverImageRef.current, { 
      clipPath: 'inset(0% 0% 0% 0%)', 
      duration: 0.7, 
      ease: 'expo.out' 
    }, 0)

    // Strong light shimmer sweeping perfectly with the wipe edge
    if (shimmerRef.current) {
      tl.fromTo(shimmerRef.current,
        { left: '0%', opacity: 0 },
        { left: '100%', opacity: 1, duration: 0.7, ease: 'expo.out' },
        0
      ).to(shimmerRef.current, { opacity: 0, duration: 0.2 }, "-=0.2")
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (cursorRef.current) {
      // Pop out with overwrite to kill any conflicting mouseenter tweens
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: 'power3.out', overwrite: true })
    }

    if (!hasHover) return;

    const tl = gsap.timeline({ overwrite: 'auto' })

    // Wipe effect recedes (right to left)
    tl.to(hoverImageRef.current, { 
      clipPath: 'inset(0% 100% 0% 0%)', 
      duration: 0.65, 
      ease: 'expo.out' 
    }, 0)

    // Light shimmer sweeps back
    if (shimmerRef.current) {
      tl.fromTo(shimmerRef.current,
        { left: '100%', opacity: 0 },
        { left: '0%', opacity: 1, duration: 0.65, ease: 'expo.out' },
        0
      ).to(shimmerRef.current, { opacity: 0, duration: 0.15 }, "-=0.15")
    }
  }

  const cardContent = (
    <>
      <div 
        className="relative w-full aspect-[2/3] mb-5 bg-[var(--color-sec-200)] overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Main Image */}
        <div className="absolute inset-0 w-full h-full origin-center">
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 select-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
        
        {/* Hover Image (Wiped) */}
        {hasHover && (
          <div ref={hoverImageRef} className="absolute inset-0 w-full h-full origin-center pointer-events-none z-10">
            <Image
              src={product.hoverImage}
              alt={`${product.name} Hover`}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>
        )}

        {/* Strong Light Shimmer Edge */}
        {hasHover && (
          <div 
            ref={shimmerRef}
            className="absolute top-0 bottom-0 w-[20%] -translate-x-1/2 pointer-events-none z-20 mix-blend-overlay bg-gradient-to-r from-transparent via-white to-transparent blur-[2px]"
          />
        )}

        {/* Custom Shop Now Cursor Pill */}
        <div 
          ref={cursorRef}
          className="absolute top-0 left-0 pointer-events-none z-50 flex items-center justify-center gap-1 bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] px-3 py-1 rounded-full font-outfit text-[9px] md:text-[10px] uppercase tracking-widest opacity-0 scale-0 origin-top-left shadow-xl whitespace-nowrap"
        >
          Shop Now <ArrowUpRight className="w-2.5 h-2.5" />
        </div>
      </div>
      
      {/* Simple & Clean Typography */}
      <div className="flex justify-between items-start pt-1 px-1">
        <h3 className="font-outfit text-lg md:text-xl tracking-tight text-[var(--color-primary-dark)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {product.name}
        </h3>
        <span className="font-nohemi text-sm md:text-base text-[var(--color-sec-600)] font-bold">
          <span className="font-sans">₹</span>{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(product.price)}
        </span>
      </div>
    </>
  )

  return (
    <div className="group cursor-pointer">
      {disableLink ? (
        cardContent
      ) : (
        <Link href={`/products/${product.slug}`}>
          {cardContent}
        </Link>
      )}
    </div>
  )
}
