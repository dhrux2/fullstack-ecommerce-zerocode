"use client"

import { useGsapReveal } from '@/hooks/useGsapReveal'

export default function TermsPage() {
  useGsapReveal('.reveal-el')

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)] pt-32 pb-40 px-6 lg:px-12">
      <div className="max-w-screen-md mx-auto reveal-el">
        <h1 className="font-thunder-italic uppercase text-6xl md:text-8xl mb-12 border-b border-[var(--color-sec-800)] pb-6">
          Terms & Conditions
        </h1>

        <div className="space-y-12 font-nohemi text-lg text-[var(--color-sec-800)] leading-relaxed">
          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Welcome to Zero Code
            </h2>
            <p>
              These terms outline the rules and regulations for the use of ZERO CODE's Website and Services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our platform if you do not agree to all the terms stated on this page.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Service Availability
            </h2>
            <p>
              While our brand is built on a philosophy of minimalist, timeless essentials, our reach is comprehensive. We are proud to state that we deliver all over India. By placing an order, you warrant that you are legally capable of entering into binding contracts and that your delivery address is within our serviceable zones across the country.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, ZERO CODE and/or its licensors own the intellectual property rights for all material on this platform. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Modifications to Service
            </h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
