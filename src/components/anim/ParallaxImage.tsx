'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number // Velocity of parallax shift (recommended: -40 to 40)
  aspect?: string // CSS aspect ratio class (default: aspect-[3/4])
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  speed = 30,
  aspect = 'aspect-[3/4]',
  className = '',
  imageClassName = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const container = containerRef.current
    const imgEl = imageRef.current
    if (!container || !imgEl) return
    const anim = gsap.fromTo(
      imgEl,
      { yPercent: -Math.abs(speed) / 2 },
      {
        yPercent: Math.abs(speed) / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${aspect} ${className}`}
    >
      <div
        ref={imageRef}
        className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover select-none ${imageClassName}`}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>
    </div>
  )
}
