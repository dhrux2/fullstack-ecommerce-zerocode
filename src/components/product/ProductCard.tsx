'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    primaryImage: string
    hoverImage: string
    tag: string | null
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(product.primaryImage)

  return (
    <div className="product-card" style={{ background: '#F5F4F0', paddingBottom: '20px' }}>
      <Link href={`/products/${product.slug}`} className="block">
        <img 
          src={currentImage}
          alt={product.name}
          onMouseEnter={() => setCurrentImage(product.hoverImage)}
          onMouseLeave={() => setCurrentImage(product.primaryImage)}
          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </Link>
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'baseline',
        padding: '12px 0 0 0',
        margin: '0',
      }}>
        <Link href={`/products/${product.slug}`}>
          <span style={{
            fontFamily: "var(--font-ui), sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
          }}>
            {product.name}
          </span>
        </Link>
        <span style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: '#6B6B6B',
        }}>
          ₹{product.price.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  )
}

