"use client"

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import gsap from 'gsap'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function ClientProductDetail({ product }: { product: any }) {
  const { addItem } = useCartStore()

  useGsapReveal('.reveal-el')

  if (!product) {
    notFound()
  }

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showHoverImage, setShowHoverImage] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  
  const xSet = useRef<any>(null)
  const ySet = useRef<any>(null)
  
  const sizes = ['S', 'M', 'L', 'XL']

  useEffect(() => {
    if (cursorRef.current) {
      xSet.current = gsap.quickSetter(cursorRef.current, "x", "px")
      ySet.current = gsap.quickSetter(cursorRef.current, "y", "px")
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Offset like the Shop Now pill, but pushed further down and right to avoid overlap
    if (xSet.current) xSet.current(x + 16)
    if (ySet.current) ySet.current(y + 24)
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    gsap.set(cursorRef.current, { x: x + 16, y: y + 24 })
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', overwrite: true })
  }

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: 'power3.out', overwrite: true })
    }
  }

  const handleImageClick = () => {
    if (product.primaryImage !== product.hoverImage) {
      setShowHoverImage(!showHoverImage)
    }
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedSize) return
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      primaryImage: product.primaryImage,
      size: selectedSize,
      stock: 10,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)

    // Click spark animation
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('div')
      spark.className = 'absolute w-1.5 h-1.5 rounded-full bg-[var(--color-white)] pointer-events-none z-50'
      spark.style.left = `${x}px`
      spark.style.top = `${y}px`
      button.appendChild(spark)

      const angle = (i / 12) * Math.PI * 2
      const velocity = 40 + Math.random() * 20
      const tx = Math.cos(angle) * velocity
      const ty = Math.sin(angle) * velocity

      gsap.to(spark, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'power3.out',
        onComplete: () => spark.remove()
      })
    }
  }

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 min-h-screen pt-24 md:pt-32 pb-16 px-6 lg:px-12 max-w-screen-2xl mx-auto items-center">
        
        {/* Left Side: Full ratio interactive image */}
        <div className="w-full flex justify-center items-center">
          <div 
            className="w-full h-[70vh] md:h-[80vh] relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-[var(--color-sec-200)] flex justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleImageClick}
          >
            {/* Using object-cover to perfectly zoom and fill the container */}
            <img
              src={showHoverImage ? product.hoverImage : product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300 select-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            {/* Custom interactive cursor */}
            <div 
              ref={cursorRef}
              className="absolute top-0 left-0 pointer-events-none z-50 flex items-center justify-center w-6 h-6 bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] rounded-full opacity-0 scale-0 origin-top-left shadow-xl"
            >
              {showHoverImage ? <ArrowLeft className="w-2.5 h-2.5" /> : <ArrowRight className="w-2.5 h-2.5" />}
            </div>
          </div>
        </div>

        {/* Right Side: Refined, properly scaled metadata */}
        <div className="w-full flex items-center">
          <div className="w-full max-w-2xl">
            <div className="reveal-el mb-8">
              <Link href="/products" className="inline-flex items-center text-xs font-outfit uppercase tracking-widest text-[var(--color-sec-400)] hover:text-[var(--color-primary-dark)] transition-colors mb-8">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Back to Collection
              </Link>
              <h1 className="font-outfit uppercase text-5xl lg:text-6xl tracking-tight mb-4 leading-none">
                {product.name}
              </h1>
              <p className="font-nohemi text-lg text-[var(--color-sec-600)] font-bold tracking-wide mb-8">
                <span className="font-sans">₹</span>{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(product.price)}
              </p>
            </div>

            <div className="reveal-el mb-10 space-y-4">
              <p className="font-nohemi text-base text-[var(--color-sec-800)] leading-relaxed">
                {product.description}
              </p>
              <ul className="font-nohemi text-xs text-[var(--color-sec-600)] space-y-2 list-disc list-inside mt-6">
                <li>100% Premium Heavyweight Cotton</li>
                <li>400gsm brushed fleece interior</li>
                <li>Drop shoulder relaxed silhouette</li>
                <li>Crafted with uncompromising detail</li>
              </ul>
            </div>

            <div className="reveal-el mb-10">
              <div className="flex justify-between items-end mb-4">
                <span className="font-outfit text-xs tracking-widest uppercase">Size</span>
                <span className="font-nohemi text-[10px] tracking-wide underline cursor-pointer hover:text-[var(--color-accent)] transition-colors text-[var(--color-sec-600)]">Size Guide</span>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 font-outfit text-xs ${
                      selectedSize === size 
                        ? 'border-[var(--color-primary-dark)] bg-[var(--color-primary-dark)] text-[var(--color-white)] shadow-md scale-105' 
                        : 'border-[var(--color-sec-400)] hover:border-[var(--color-primary-dark)] hover:scale-105 text-[var(--color-sec-800)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="reveal-el">
              <button 
                onClick={(e) => handleAddToCart(e)}
                disabled={!selectedSize || isAdded}
                className={`relative overflow-hidden w-full h-[48px] rounded-full font-outfit text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  !selectedSize 
                    ? 'bg-[var(--color-sec-200)] text-[var(--color-sec-400)] cursor-not-allowed'
                    : isAdded
                      ? 'bg-[var(--color-accent)] text-[var(--color-white)] cursor-default'
                      : 'bg-[var(--color-primary-dark)] text-[var(--color-white)] hover:bg-[var(--color-accent)] hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                }`}
              >
                <div className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isAdded ? '-translate-y-full' : 'translate-y-0'}`}>
                  <span className="w-full h-full flex items-center justify-center shrink-0">
                    {!selectedSize ? 'Select Size' : 'Add to Bag'}
                  </span>
                  <span className="w-full h-full flex items-center justify-center shrink-0 text-[var(--color-white)]">
                    Added to Bag
                  </span>
                </div>
              </button>
            </div>
            
            <div className="reveal-el mt-12 text-left">
              <p className="font-thunder-italic uppercase text-2xl text-[var(--color-sec-400)]">
                "Stripped of noise. Built for the streets."
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
