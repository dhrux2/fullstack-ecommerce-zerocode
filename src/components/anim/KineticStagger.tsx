'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface KineticStaggerProps {
  children: React.ReactNode
  yOffset?: number
  duration?: number
  stagger?: number
  delay?: number
  className?: string
  selector?: string // Optional custom child CSS selector (defaults to direct child elements)
}

export default function KineticStagger({
  children,
  yOffset = 40,
  duration = 1.6,
  stagger = 0.15,
  delay = 0,
  className = '',
  selector,
}: KineticStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const element = containerRef.current
    if (!element) return

    // Find target child elements to animate
    const targets = selector ? element.querySelectorAll(selector) : element.children
    if (targets.length === 0) return

    // Set initial structural properties to prevent visual pops
    gsap.set(targets, { y: yOffset, opacity: 0 })

    const anim = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [yOffset, duration, stagger, delay, selector])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
