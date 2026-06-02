"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import ProductCard from '@/components/ProductCard'
import ScrollExpandMedia from '@/components/scroll-expansion-hero'
import BounceCards from '@/components/BounceCards'
import Shuffle from '@/components/Shuffle'
import TextType from '@/components/TextType'

export default function ClientHome({ featuredProducts }: { featuredProducts: any[] }) {
  useGsapReveal('.reveal-el')

  return (
    <div className="w-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]">
      <ScrollExpandMedia
        mediaSrc="/videos/ZeroCodeAd.mp4"
        bgImageSrc="/photos/hoodie-minimal-dark-studio.png"
        title="ZERO CODE"
        textBlend={false}
      />
      
      {/* Editorial / Brand Mission */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-16 pb-32 md:pt-20 md:pb-48 gap-8 lg:gap-12">
        
        <div className="w-full flex flex-col items-center justify-center mx-auto">
          <div className="reveal-el mb-8 w-full">
            <h2 className="font-outfit text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight text-black leading-none uppercase md:whitespace-nowrap flex flex-col md:flex-row items-center md:items-baseline justify-center gap-2 md:gap-6 lg:gap-8">
              <Shuffle 
                text="MODERN" 
                tag="span"
                shuffleDirection="right"
                duration={0.35}
                ease="power3.out"
                shuffleTimes={1}
                stagger={0.03}
                triggerOnHover={true}
                loop={true}
                loopDelay={2}
              />
              <span>EXECUTION</span>
            </h2>
          </div>
          <div className="reveal-el mb-12">
            <p className="font-nohemi text-lg md:text-xl text-[var(--color-sec-600)] max-w-3xl leading-relaxed font-light mx-auto">
              We focus on absolute minimalism and uncompromising weight. Strip away the noise, the oversized logos, and the clutter. What remains are timeless menswear silhouettes built for the streets—designed for those who appreciate quiet luxury.
            </p>
          </div>
          <div className="reveal-el">
            <Link 
              href="/products" 
              className="inline-block font-outfit text-sm tracking-[0.2em] uppercase text-[var(--color-primary-dark)] hover:underline underline-offset-8 transition-all duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        <div className="reveal-el w-full flex justify-center mt-12 md:mt-16 hidden md:flex">
          <BounceCards 
            images={[
              '/photos/home-01.png',
              '/photos/home-02.png',
              '/photos/home-03.png',
              '/photos/home-04.png',
              '/photos/home-05.png'
            ]}
            containerWidth={1000}
            containerHeight={350}
            transformStyles={[
              'rotate(12deg) translate(-300px)',
              'rotate(6deg) translate(-150px)',
              'rotate(0deg)',
              'rotate(-6deg) translate(150px)',
              'rotate(-12deg) translate(300px)'
            ]}
            animationDelay={0.2}
          />
        </div>
      </section>

        {/* Text-Heavy Interstitial */}
        <section className="w-full px-6 py-24 md:py-32 flex justify-center text-center bg-[#2C2C2C] overflow-hidden">
          <h3 className="reveal-el font-outfit text-2xl md:text-5xl lg:text-[54px] xl:text-6xl text-[#F5F4F0] leading-tight w-full max-w-[1400px] tracking-tight md:whitespace-nowrap">
            The quietest person in the room is wearing<br/>
            <TextType
              as="span"
              className="font-thunder-italic uppercase tracking-wide text-5xl sm:text-6xl md:text-8xl lg:text-[100px] text-[#A0A0A0] mt-4 md:mt-8 block whitespace-normal leading-none"
              text={["THE LOUDEST FIT", "NOTHING EXTRA", "EVERYTHING RIGHT"]}
              cursorCharacter="|"
              cursorClassName="font-sans font-thin opacity-100"
              typingSpeed={150}
              deletingSpeed={50}
              pauseDuration={900}
              cursorBlinkDuration={1}
              showCursor={true}
            />
          </h3>
        </section>

        {/* Compact Featured Grid */}
        <section className="w-full px-6 pt-32 pb-24 md:pt-64 md:pb-32">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 reveal-el gap-6">
              <h2 className="font-outfit text-5xl md:text-8xl tracking-tight">New Arrivals</h2>
              <Link href="/products" className="font-outfit text-sm tracking-widest uppercase hover:text-[var(--color-accent)] transition-colors pb-2 border-b border-[var(--color-sec-600)]">
                View All Products
              </Link>
            </div>
            
            {/* Desktop: Playing Cards Fanned Layout */}
            <div className="hidden md:flex w-full justify-center items-center pt-12 pb-24 overflow-hidden">
              <style dangerouslySetInnerHTML={{ __html: `
                .new-arrivals-fan .card { width: 400px !important; border-radius: 24px !important; }
                @media (max-width: 1024px) { .new-arrivals-fan .card { width: 280px !important; } }
              `}} />
              {(() => {
                const tops = featuredProducts.filter(p => p.category === 'TOPS')
                const displayProducts = tops.length >= 2 ? tops : featuredProducts
                return (
                  <BounceCards
                    className="new-arrivals-fan"
                    images={[
                      displayProducts[0].primaryImage,
                      displayProducts[0].hoverImage,
                      displayProducts[1].primaryImage,
                      displayProducts[1].hoverImage
                    ]}
                    containerWidth={100}
                    containerHeight={500}
                    animationDelay={0.1}
                    animationStagger={0.08}
                    enableHover={true}
                    hoverEffect="minimal"
                    transformStyles={[
                      'rotate(-2deg) translate(-430px, 15px)',
                      'rotate(1deg) translate(-145px, -5px)',
                      'rotate(-1.5deg) translate(135px, 10px)',
                      'rotate(3deg) translate(425px, 0px)'
                    ]}
                  />
                )
              })()}
            </div>

            {/* Mobile: Horizontal Scroll Carousel */}
            <div className="md:hidden w-full flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 no-scrollbar">
              {(() => {
                const tops = featuredProducts.filter(p => p.category === 'TOPS')
                const displayProducts = tops.length >= 2 ? tops : featuredProducts
                
                // Show up to 4 images
                const images = [
                  displayProducts[0].primaryImage,
                  displayProducts[0].hoverImage,
                  displayProducts[1]?.primaryImage,
                  displayProducts[1]?.hoverImage
                ].filter(Boolean)

                return images.map((img, idx) => (
                  <div key={idx} className="shrink-0 w-[80vw] sm:w-[60vw] snap-center rounded-2xl overflow-hidden bg-gray-100">
                    <Image 
                      src={img} 
                      alt={`New Arrival ${idx + 1}`} 
                      width={600} 
                      height={800} 
                      className="w-full h-auto object-cover" 
                      priority={idx === 0}
                    />
                  </div>
                ))
              })()}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full px-6 pt-8 md:pt-12 pb-24 md:pb-40">
          <div className="max-w-screen-2xl mx-auto reveal-el">
            <div className="group relative w-full lg:w-4/5 mx-auto bg-[#2C2C2C] overflow-hidden rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/product_images/hoodie-urban-props-v2.png" 
                  alt="Newsletter" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover opacity-30 mix-blend-screen transition-transform duration-1000 group-hover:scale-105 grayscale select-none" 
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 py-24 md:p-24">
                <h3 className="font-thunder-italic text-5xl md:text-7xl lg:text-[100px] text-[#F5F4F0] mb-2 uppercase leading-none tracking-wide text-center">Join The Club</h3>
                <p className="font-outfit text-[#A0A0A0] text-sm md:text-base mb-6 md:mb-8 max-w-[90%] md:max-w-[80%] leading-relaxed text-center">Sign up for early access to our limited drops and exclusive collections.</p>
                <form className="w-full max-w-[280px] sm:max-w-sm flex flex-col sm:flex-row gap-4 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Email Address" className="w-full sm:flex-1 bg-transparent border-b border-[#A0A0A0] focus:border-[#F5F4F0] text-[#F5F4F0] px-0 py-2 sm:py-3 outline-none font-outfit transition-colors placeholder:text-[#A0A0A0]/50 text-sm tracking-wide" />
                  <button type="submit" className="w-full sm:w-auto bg-[#F5F4F0] text-[#2C2C2C] font-outfit uppercase tracking-widest text-xs px-8 py-3 sm:py-4 hover:bg-white transition-colors font-medium">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
