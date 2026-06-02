"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TShirtIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
  </svg>
)

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      // Initial state
      gsap.set(iconRef.current, { opacity: 0, scale: 0.5 })

      // Fade and pop in
      tl.to(iconRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.5)'
      })

      // Spin
      tl.to(iconRef.current, {
        rotation: 360,
        duration: 0.8,
        ease: 'power2.inOut'
      })

      // Stop & hold briefly
      tl.to({}, { duration: 0.3 })

      // Snappy container slide up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center"
    >
      <div 
        ref={iconRef}
        className="relative w-12 h-12 md:w-16 md:h-16 text-[#F5F4F0] flex items-center justify-center origin-center"
      >
        <TShirtIcon className="w-full h-full" />
      </div>
    </div>
  )
}
