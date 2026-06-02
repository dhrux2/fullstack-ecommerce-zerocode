"use client"

import { useGsapReveal } from '@/hooks/useGsapReveal'
import ProductCard from '@/components/ProductCard'
import CustomCurvedMarquee from '@/components/CustomCurvedMarquee'
import TextType from '@/components/TextType'

export default function ClientProducts({ allProducts }: { allProducts: any[] }) {
  useGsapReveal('.reveal-el')

  const tshirts = allProducts.filter(p => p.category === 'TOPS')
  const hoodies = allProducts.filter(p => p.category === 'OUTERWEAR')

  return (
    <div className="w-full relative bg-[var(--color-primary-light)] min-h-screen pt-48 pb-16 px-6 lg:px-12 text-[var(--color-primary-dark)] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-24 md:mb-40 reveal-el text-center">
          <TextType
            as="h1"
            className="font-thunder-italic uppercase text-7xl md:text-9xl mb-8 block"
            text={["COLLECTION", "COLLECTION"]}
            cursorCharacter="|"
            cursorClassName="font-sans font-thin opacity-100"
            typingSpeed={150}
            deletingSpeed={50}
            pauseDuration={1500}
            cursorBlinkDuration={1}
            showCursor={true}
          />
          <p className="font-nohemi text-lg md:text-xl text-[var(--color-sec-600)] max-w-2xl mx-auto leading-relaxed">
            A curated selection of menswear essentials. Timeless silhouettes, uncompromising weight, stripped of all excess.
          </p>
        </header>

        {/* T-Shirts Category */}
        <div className="reveal-el mb-16 flex items-end justify-between border-b border-[var(--color-primary-dark)] border-opacity-10 pb-4">
          <h2 className="font-outfit text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            T-Shirts
          </h2>
          <span className="font-nohemi text-sm text-[var(--color-sec-600)]">{tshirts.length} Styles</span>
        </div>

        {/* 3-Column Tops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-32 mb-32 md:mb-48">
          {tshirts.map((product, index) => (
            <div 
              key={product.id} 
              className={`reveal-el ${index === 1 ? 'md:mt-24' : index === 2 ? 'md:mt-12' : ''}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Hoodies Category */}
        <div className="reveal-el mb-16 flex items-end justify-between border-b border-[var(--color-primary-dark)] border-opacity-10 pb-4">
          <h2 className="font-outfit text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            Hoodies
          </h2>
          <span className="font-nohemi text-sm text-[var(--color-sec-600)]">{hoodies.length} Styles</span>
        </div>

        {/* 3-Column Outerwear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-32 mb-32">
          {hoodies.map((product, index) => (
            <div 
              key={product.id} 
              className={`reveal-el ${index === 1 ? 'md:mt-24' : index === 2 ? 'md:mt-12' : ''}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Animated Marquee: Custom Zero-Lag Implementation */}
      <div className="-mx-6 lg:-mx-12 mt-16 mb-8 z-20">
        <CustomCurvedMarquee />
      </div>
    </div>
  )
}
