'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('zero-code-cookie-consent')
    if (!consent) {
      // Delay showing it slightly for a smoother entrance
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('zero-code-cookie-consent', 'accepted')
    
    // Animate out
    gsap.to('.cookie-banner', {
      y: '120%',
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => setShow(false)
    })
  }

  const handleDecline = () => {
    localStorage.setItem('zero-code-cookie-consent', 'declined')
    
    // Animate out
    gsap.to('.cookie-banner', {
      y: '120%',
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => setShow(false)
    })
  }

  if (!show) return null

  return (
    <div className="cookie-banner fixed bottom-6 left-0 right-0 z-[100] px-6 pointer-events-none flex justify-center">
      <div 
        className="pointer-events-auto max-w-4xl w-full bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl"
        style={{
          animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div className="flex-1">
          <h3 className="font-outfit uppercase tracking-widest text-sm font-bold mb-2">
            Cookie Consent
          </h3>
          <p className="font-nohemi text-sm text-[var(--color-sec-400)] leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our <Link href="/cookies" className="underline hover:text-[var(--color-white)] transition-colors">Cookie Policy</Link> to learn more.
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none py-3 px-6 border border-[var(--color-sec-600)] text-[var(--color-sec-400)] font-outfit text-xs tracking-[0.1em] uppercase hover:text-[var(--color-white)] hover:border-[var(--color-white)] transition-colors text-center"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none py-3 px-8 bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] font-outfit text-xs tracking-[0.1em] uppercase hover:bg-[var(--color-accent)] hover:text-white transition-colors text-center"
          >
            Accept
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(120%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
