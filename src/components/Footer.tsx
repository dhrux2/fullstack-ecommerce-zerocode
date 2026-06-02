'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import VariableProximity from '@/components/VariableProximity'

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <footer 
      ref={containerRef}
      className="bg-[var(--color-primary-dark)] pt-24 px-6 md:px-12 text-[var(--color-primary-light)] relative overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 md:mb-24">
          
          <div>
            <h3 className="font-outfit text-sm tracking-widest uppercase mb-6">Sitemap</h3>
            <ul className="space-y-4 font-nohemi text-sm text-[var(--color-sec-400)]">
              <li><Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-[var(--color-accent)] transition-colors">Collection</Link></li>
              <li><Link href="/cart" className="hover:text-[var(--color-accent)] transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-sm tracking-widest uppercase mb-6">Social</h3>
            <ul className="space-y-4 font-nohemi text-sm text-[var(--color-sec-400)]">
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Pinterest</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-sm tracking-widest uppercase mb-6">Information</h3>
            <ul className="space-y-4 font-nohemi text-sm text-[var(--color-sec-400)]">
              <li><Link href="/shipping" className="hover:text-[var(--color-accent)] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--color-accent)] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-[var(--color-accent)] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col justify-start">
            <p className="font-nohemi text-xs tracking-widest uppercase text-[var(--color-sec-600)] whitespace-nowrap mb-6">
              © {new Date().getFullYear()} Zero Code. All rights reserved.
            </p>
            <a href="mailto:store.zerocode@gmail.com" className="font-nohemi text-sm tracking-wide text-[var(--color-primary-light)] hover:text-[var(--color-accent)] transition-colors">
              store.zerocode@gmail.com
            </a>
          </div>

        </div>
        
        <div className="w-full h-[1px] bg-[var(--color-sec-800)] mt-8 md:mt-0 mb-8"></div>
      </div>

      <div 
        className="w-full flex justify-center items-end pointer-events-auto select-none mt-auto whitespace-nowrap"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 75%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 75%)'
        }}
      >
        <VariableProximity
          label="ZERO CODE"
          className="font-outfit-regular text-[17vw] md:text-[13.5vw] leading-none text-[var(--color-sec-600)]"
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={containerRef}
          radius={500}
          falloff="linear"
        />
      </div>
    </footer>
  )
}
