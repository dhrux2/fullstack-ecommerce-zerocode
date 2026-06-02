'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    
    const gsapTickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(gsapTickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(gsapTickerUpdate)
    }
  }, [])

  return <>{children}</>
}
