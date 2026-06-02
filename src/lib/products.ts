export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  tag: string | null
  primaryImage: string
  hoverImage: string
  sizes: string[]
  description: string
  details: string[]
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'outdoor-editorial-hoodie',
    name: 'OUTDOOR EDITORIAL HOODIE',
    category: 'OUTERWEAR',
    price: 3499,
    tag: 'NEW',
    primaryImage: '/photos/cream-hoodie-studio.png',
    hoverImage: '/photos/cream-hoodie-street.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Heavyweight organic cotton. Designed for the elements. Minimal branding.',
    details: ['400GSM Organic Cotton', 'Double-lined hood', 'Kangaroo pocket', 'Relaxed fit', 'Made in India'],
  },
  {
    id: '2',
    slug: 'street-lifestyle-hoodie',
    name: 'STREET LIFESTYLE HOODIE',
    category: 'OUTERWEAR',
    price: 3299,
    tag: 'BESTSELLER',
    primaryImage: '/photos/black-studio-hoodie.png',
    hoverImage: '/photos/black-street-hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The ultimate daily driver. Soft brushed back fleece with a tailored drape.',
    details: ['380GSM Cotton Blend', 'Ribbed cuffs and hem', 'Drop shoulder', 'Pre-shrunk', 'Made in India'],
  },

  {
    id: '4',
    slug: 'relaxed-fit-t-shirt-black',
    name: 'RELAXED FIT T-SHIRT BLACK',
    category: 'TOPS',
    price: 1599,
    tag: 'NEW',
    primaryImage: '/photos/black-tshirt-studio.png',
    hoverImage: '/photos/black-tshirt-street.png',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Pima cotton perfection. Relaxed fit for absolute comfort.',
    details: ['240GSM Pima Cotton', 'Crew neck', 'Taped shoulder seams', 'Relaxed fit', 'Made in India'],
  },
  {
    id: '5',
    slug: 'relaxed-fit-t-shirt-white',
    name: 'RELAXED FIT T-SHIRT WHITE',
    category: 'TOPS',
    price: 1599,
    tag: 'BESTSELLER',
    primaryImage: '/photos/white-tshirt-studio.png',
    hoverImage: '/photos/white-tshirt-street.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Crisp white tone. Designed for the concrete jungle. Rugged, durable, yet extremely soft.',
    details: ['240GSM Cotton', 'Enzyme washed', 'Relaxed fit', 'Double needle hem', 'Made in India'],
  },
  {
    id: '7',
    slug: 'relaxed-fit-t-shirt-red',
    name: 'RELAXED FIT T-SHIRT RED',
    category: 'TOPS',
    price: 1599,
    tag: 'NEW',
    primaryImage: '/photos/red-tshirt-studio-v2.png',
    hoverImage: '/photos/red-tshirt-street.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Vibrant red tone. Designed to stand out. Rugged, durable, yet extremely soft.',
    details: ['240GSM Cotton', 'Enzyme washed', 'Relaxed fit', 'Double needle hem', 'Made in India'],
  },
  {
    id: '8',
    slug: 'essential-hoodie-olive',
    name: 'ESSENTIAL HOODIE OLIVE',
    category: 'OUTERWEAR',
    price: 3499,
    tag: 'LIMITED',
    primaryImage: '/photos/olive-hoodie-studio.png',
    hoverImage: '/photos/olive-hoodie-street.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Deep olive tone. Heavyweight organic cotton crafted for the outdoors. Minimal branding.',
    details: ['400GSM Organic Cotton', 'Double-lined hood', 'Kangaroo pocket', 'Relaxed fit', 'Made in India'],
  }
]
