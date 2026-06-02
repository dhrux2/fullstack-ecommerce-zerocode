"use client"

import Image from 'next/image'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import TextType from '@/components/TextType'

export default function AboutPage() {
  useGsapReveal('.reveal-el')

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)] pt-32 pb-40">
      
      {/* Hero Section */}
      <div className="w-full px-6 lg:px-12 mb-24 md:mb-32">
        <div className="max-w-screen-xl mx-auto reveal-el text-center">
          <TextType
            as="h1"
            className="font-thunder-italic uppercase text-7xl md:text-9xl mb-6 block"
            text={["ORIGINS", "ORIGINS"]}
            cursorCharacter="|"
            cursorClassName="font-sans font-thin opacity-100"
            typingSpeed={150}
            deletingSpeed={50}
            pauseDuration={1500}
            cursorBlinkDuration={1}
            showCursor={true}
          />
          <p className="font-outfit text-lg md:text-xl text-[var(--color-sec-600)] max-w-2xl mx-auto">
            Premium menswear essentials, crafted for everyday life.
          </p>
        </div>
      </div>

      {/* Story Section 1: Built to Last */}
      <div className="w-full mb-32 md:mb-40 reveal-el">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Side: Text */}
          <div className="w-full lg:w-1/2 py-16 lg:py-0 lg:pl-12">
            <h2 className="font-outfit uppercase tracking-wide text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.05] font-black text-black">
              Quality Without<br/>Compromise
            </h2>
            <div className="space-y-6">
              <p className="font-nohemi text-lg md:text-xl text-[var(--color-sec-800)] leading-relaxed">
                We believe in making clothes that you can rely on. Instead of chasing fast fashion trends, our focus is entirely on heavyweight fabrics, comfortable fits, and durable construction. 
              </p>
              <p className="font-nohemi text-lg md:text-xl text-[var(--color-sec-800)] leading-relaxed">
                Every hoodie and t-shirt is meticulously designed to hold its shape, resist wear and tear, and feel even better with every wash. When you buy less, but buy better, your wardrobe becomes timeless.
              </p>
            </div>
          </div>
          
          {/* Right Side: Image with equal space on right */}
          <div className="w-full lg:w-1/2 flex justify-center lg:pr-12">
            <img 
              src="/photos/hoodies-about-v2.png"
              alt="Zero Code Quality Hoodies"
              className="w-full h-auto object-contain drop-shadow-2xl scale-105 transform-gpu transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-110 hover:drop-shadow-[0_45px_45px_rgba(0,0,0,0.25)] select-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>
          
        </div>
      </div>

      {/* Story Section 2: Minimalist Design */}
      <div className="w-full mb-32 md:mb-48 reveal-el">
        <div className="w-full relative shadow-2xl">
          {/* Image only, dictating exact section dimensions */}
          <img 
            src="/photos/t-shirt-dark-editorial-v2.png"
            alt="Zero Code Minimalist Design"
            className="w-full h-auto block select-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          
          {/* Text Content overlaying on Right */}
          <div className="absolute inset-0 z-10 w-full flex pointer-events-none items-center">
            <div className="max-w-screen-xl w-full mx-auto px-6 lg:px-12 flex justify-end">
              <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center text-[var(--color-primary-light)] pointer-events-auto">
                <h2 className="font-outfit uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-tight drop-shadow-lg">
                  Minimalist Design
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <p className="font-nohemi text-base md:text-lg text-[var(--color-sec-200)] leading-relaxed drop-shadow-md">
                    Good design doesn't need to shout. We removed the oversized logos, loud graphics, and unnecessary details, leaving only what truly matters: the perfect cut and exceptional materials.
                  </p>
                  <p className="font-nohemi text-base md:text-lg text-[var(--color-sec-200)] leading-relaxed drop-shadow-md hidden md:block">
                    Our clothing acts as a blank canvas for your personal style. It's a modern uniform that fits effortlessly into your daily routine, whether you're at work, in the studio, or on the street.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
