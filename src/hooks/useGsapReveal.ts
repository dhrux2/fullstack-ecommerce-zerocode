import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal(selector: string, dependencyArray: any[] = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector)
      
      elements.forEach((el: any) => {
        gsap.fromTo(
          el,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1.2,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            onStart: () => gsap.set(el, { willChange: "transform, opacity" }),
            onComplete: () => gsap.set(el, { clearProps: "willChange" })
          }
        )
      })
    })

    return () => ctx.revert()
  }, dependencyArray)
}
