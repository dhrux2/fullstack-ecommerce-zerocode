'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface MaskedRevealProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number
  delay?: number
  className?: string
  triggerOnce?: boolean
}

export default function MaskedReveal({
  children,
  direction = 'left',
  duration = 1.4,
  delay = 0,
  className = '',
  triggerOnce = true,
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const element = containerRef.current
    if (!element) return

    // Define clip-path states based on direction
    let startClip = ''
    let endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

    switch (direction) {
      case 'left':
        startClip = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        break
      case 'right':
        startClip = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        break
      case 'top':
        startClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        break
      case 'bottom':
        startClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        break
    }

    // Set initial state
    gsap.set(element, { clipPath: startClip })

    // Animate on scroll entry
    const anim = gsap.to(element, {
      clipPath: endClip,
      duration,
      delay,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: triggerOnce ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [direction, duration, delay, triggerOnce])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ WebkitClipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)' }} // Prevent flashes on server render
    >
      {children}
    </div>
  )
}
