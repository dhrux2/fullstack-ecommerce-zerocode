'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollytellingTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  type?: 'tracking' | 'words'
  startTracking?: string
  endTracking?: string
  duration?: number
  delay?: number
  className?: string
}

export default function ScrollytellingText({
  text,
  as: Component = 'h2',
  type = 'words',
  startTracking = '0.05em',
  endTracking = '0.25em',
  duration = 1.4,
  delay = 0,
  className = '',
}: ScrollytellingTextProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const element = textRef.current
    if (!element) return

    if (type === 'tracking') {
      // Set initial values
      gsap.set(element, { letterSpacing: startTracking, opacity: 0 })

      const anim = gsap.to(element, {
        letterSpacing: endTracking,
        opacity: 1,
        duration,
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
    } else {
      // Split words into masked spans
      const words = text.split(' ')
      element.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden pb-1 mr-[0.3em]"><span class="inline-block translate-y-[100%] opacity-0 will-change-transform">${word}</span></span>`
        )
        .join('')

      const innerSpans = element.querySelectorAll('span > span')

      const anim = gsap.to(innerSpans, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.05,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      return () => {
        anim.scrollTrigger?.kill()
        anim.kill()
      }
    }
  }, [text, type, startTracking, endTracking, duration, delay])

  return (
    <Component
      ref={textRef as any}
      className={`will-change-transform ${className}`}
    >
      {text}
    </Component>
  )
}
