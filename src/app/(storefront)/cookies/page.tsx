export const metadata = {
  title: 'Cookie Policy | Zero Code',
  description: 'Our cookie policy and how we use tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-[var(--color-primary-light)] min-h-screen pt-32 pb-40 px-6 lg:px-12 text-[var(--color-primary-dark)]">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16">
          <h1 className="font-thunder uppercase text-6xl md:text-8xl tracking-wide mb-6">
            Cookie Policy
          </h1>
          <p className="font-nohemi text-[var(--color-sec-600)] text-sm tracking-widest uppercase">
            Last Updated: June 2026
          </p>
        </header>

        <div className="space-y-12 font-nohemi text-lg leading-relaxed">
          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide a better, faster, and safer experience by remembering your preferences, analyzing site performance, and personalizing content.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              How We Use Cookies
            </h2>
            <p className="mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as maintaining your shopping cart and authenticating your session.</li>
              <li><strong>Performance & Analytics:</strong> Help us understand how visitors interact with our website, allowing us to improve its design and functionality.</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings, such as your selected size or region.</li>
              <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Managing Your Cookie Preferences
            </h2>
            <p>
              You can manage or disable cookies through your browser settings at any time. Please note that disabling essential cookies may impact your ability to use certain features of our website, such as checking out or logging in.
            </p>
          </section>

          <section>
            <h2 className="font-outfit uppercase tracking-widest text-xl font-bold mb-4 text-[var(--color-primary-dark)]">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our Cookie Policy, please reach out to us at <a href="mailto:store.zerocode@gmail.com" className="underline hover:text-[var(--color-accent)] transition-colors">store.zerocode@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
