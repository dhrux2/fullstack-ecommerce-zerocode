"use client"

import { useGsapReveal } from '@/hooks/useGsapReveal'

export default function ShippingPage() {
  useGsapReveal('.reveal-el')

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)] pt-32 pb-40 px-6 lg:px-12">
      <div className="max-w-screen-md mx-auto reveal-el">
        <h1 className="font-thunder-italic uppercase text-6xl md:text-8xl mb-12 border-b border-[var(--color-sec-800)] pb-6">
          Shipping & Returns
        </h1>

        <div className="space-y-12 font-nohemi text-lg text-[var(--color-sec-800)] leading-relaxed">
          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Nationwide Delivery
            </h2>
            <p className="bg-[var(--color-sec-200)] p-6 border-l-2 border-[var(--color-primary-dark)] font-bold text-[var(--color-primary-dark)] mb-4">
              We deliver all over India.
            </p>
            <p>
              Whether you are based in a bustling metro or a remote corner of the country, ZERO CODE reaches you. We partner with premium logistics networks to ensure your order arrives safely and promptly anywhere across the Indian subcontinent.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Shipping Times
            </h2>
            <p>
              Standard orders are processed and dispatched within 24 to 48 hours. Depending on your location, delivery typically takes 3 to 7 business days. You will receive tracking information via email the moment your package leaves our warehouse.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Returns & Exchanges
            </h2>
            <p>
              We stand behind the uncompromising quality of our garments. If your piece doesn't fit exactly right or meet your expectations, we accept returns and exchanges within 7 days of delivery. 
            </p>
            <p className="mt-4">
              Items must be unworn, unwashed, and in their original condition with all tags attached. To initiate a return, simply contact our support team at store.zerocode@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
