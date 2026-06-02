"use client"

import { useGsapReveal } from '@/hooks/useGsapReveal'

export default function PrivacyPage() {
  useGsapReveal('.reveal-el')

  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen text-[var(--color-primary-dark)] pt-32 pb-40 px-6 lg:px-12">
      <div className="max-w-screen-md mx-auto reveal-el">
        <h1 className="font-thunder-italic uppercase text-6xl md:text-8xl mb-12 border-b border-[var(--color-sec-800)] pb-6">
          Privacy Policy
        </h1>

        <div className="space-y-12 font-nohemi text-lg text-[var(--color-sec-800)] leading-relaxed">
          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Our Commitment
            </h2>
            <p>
              At ZERO CODE, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Data We Collect
            </h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Financial Data, and Transaction Data. This allows us to process your orders securely and provide a seamless shopping experience.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              How We Use Your Data
            </h2>
            <p>
              Your data is essential for us to fulfill our commitments to you. Since we deliver all over India, your accurate Contact and Transaction data ensures our logistics partners can route your minimalist essentials directly to your doorstep without delay. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Security Measures
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>
          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact our support team at store.zerocode@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
