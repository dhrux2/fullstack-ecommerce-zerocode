import Link from 'next/link'

import styles from './Footer.module.css'

const collectionLinks = [
  { label: 'TOPS', href: '/products?category=Tops' },
  { label: 'OUTERWEAR', href: '/products?category=Outerwear' },
  { label: 'BOTTOMS', href: '/products?category=Bottoms' },
  { label: 'ACCESSORIES', href: '/products?category=Accessories' },
]

const supportLinks = ['TRACK ORDER', 'RETURNS & REFUNDS', 'SIZE GUIDE', 'SECURE CHECKOUT']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brandColumn}>
          <span className={styles.wordmark}>ZERO CODE</span>
          <p className={styles.tagline}>One surface. One system. Zero compromise.</p>
          <span className={styles.origin}>MADE IN INDIA</span>
        </div>

        <div className={styles.linkColumn}>
          <h2 className={styles.heading}>COLLECTIONS</h2>
          <nav aria-label="Collections" className={styles.linkList}>
            {collectionLinks.map((link) => (
              <Link key={link.label} href={link.href} className={styles.linkItem}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.linkColumn}>
          <h2 className={styles.heading}>CUSTOMER DESK</h2>
          <div aria-label="Customer desk" className={styles.linkList}>
            {supportLinks.map((item) => (
              <button key={item} type="button" className={styles.actionItem}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.newsletterColumn}>
          <h2 className={styles.heading}>NEWSLETTER</h2>
          <p className={styles.newsletterCopy}>
            Subscribe to receive drops for the next exclusive collection.
          </p>
          <div className={styles.form}>
            <input
              type="email"
              required
              placeholder="ENTER EMAIL ADDRESS"
              className={styles.input}
              aria-label="Enter email address"
            />
            <button type="button" className={styles.subscribeButton}>
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.bottomText}>© 2025 ZERO CODE STUDIO. ALL RIGHTS RESERVED.</span>
        <span className={styles.bottomText}>DESIGNED BY ANTIGRAVITY</span>
      </div>
    </footer>
  )
}
