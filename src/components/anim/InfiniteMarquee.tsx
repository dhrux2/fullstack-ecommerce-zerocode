'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface InfiniteMarqueeProps {
  text: string
  speed?: number // pixels per second-ish or duration scale
  direction?: 'left' | 'right'
  className?: string
  textClassName?: string
}

export default function InfiniteMarquee({
  text,
  speed = 15, // Duration of one full loop cycle (smaller = faster)
  direction = 'left',
  className = '',
  textClassName = '',
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Clone the track content to create the seamless loop
    const firstChild = track.children[0] as HTMLElement
    if (!firstChild) return

    // Create clones to ensure continuity
    const clone = firstChild.cloneNode(true) as HTMLElement
    track.appendChild(clone)

    // Select both children (original and clone)
    const elements = track.children

    // Set initial structural alignment
    gsap.set(track, { display: 'flex', width: 'max-content' })

    const totalWidth = firstChild.offsetWidth
    
    // Smooth infinite linear scroll
    const anim = gsap.to(elements, {
      xPercent: direction === 'left' ? -100 : 100,
      repeat: -1,
      duration: speed,
      ease: 'none',
      modifiers: {
        xPercent: (xp) => {
          // Keep it seamless
          const val = parseFloat(xp)
          if (direction === 'left') {
            return `${val % 100}`
          } else {
            return `${((val % 100) - 100) % 100}`
          }
        }
      }
    })

    return () => {
      anim.kill()
    }
  }, [text, speed, direction])

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden select-none whitespace-nowrap border-y border-[#0A0A0A] bg-[#0A0A0A] py-3 ${className}`}
    >
      <div ref={trackRef} className="flex flex-row items-center">
        <div className="flex flex-row items-center whitespace-nowrap pr-8">
          {Array(8)
            .fill(text)
            .map((t, idx) => (
              <span
                key={idx}
                className={`inline-block text-4xl text-[#F5F4F0] uppercase ${textClassName}`}
                style={{ 
                  marginRight: '2rem',
                  fontFamily: 'var(--font-ui), sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.08em'
                }}
              >
                {t}
                <span className="ml-8 text-[#C8372D]">•</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}
