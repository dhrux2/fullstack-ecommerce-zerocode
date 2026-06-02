import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const products = [
    {
      id: '1',
      name: 'ESSENTIAL HOODIE CREAM',
      slug: 'outdoor-editorial-hoodie',
      description: 'Heavyweight organic cotton. Designed for the elements. Minimal branding.',
      price: 3499,
      primaryImage: '/photos/cream-hoodie-studio.png',
      hoverImage: '/photos/cream-hoodie-street.png',
      tag: 'NEW',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'OUTERWEAR',
      stock: 50,
      featured: false,
    },
    {
      id: '2',
      name: 'STREET LIFESTYLE HOODIE',
      slug: 'street-lifestyle-hoodie',
      description: 'The ultimate daily driver. Soft brushed back fleece with a tailored drape.',
      price: 3299,
      primaryImage: '/photos/black-studio-hoodie.png',
      hoverImage: '/photos/black-street-hoodie.png',
      tag: 'BESTSELLER',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'OUTERWEAR',
      stock: 50,
      featured: true,
    },
    {
      id: '3',
      name: 'RELAXED FIT T-SHIRT BLACK',
      slug: 'relaxed-fit-tshirt-black',
      description: 'Pima cotton perfection. Relaxed fit for absolute comfort.',
      price: 1599,
      primaryImage: '/photos/black-tshirt-studio.png',
      hoverImage: '/photos/black-tshirt-street.png',
      tag: 'NEW',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'TOPS',
      stock: 100,
      featured: true,
    },
    {
      id: '4',
      name: 'RELAXED FIT T-SHIRT WHITE',
      slug: 'relaxed-fit-tshirt-white',
      description: 'Crisp white tone. Designed for the concrete jungle. Rugged, durable, yet extremely soft.',
      price: 1599,
      primaryImage: '/photos/white-tshirt-studio.png',
      hoverImage: '/photos/white-tshirt-street.png',
      tag: 'BESTSELLER',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'TOPS',
      stock: 100,
      featured: true,
    },
    {
      id: '5',
      name: 'RELAXED FIT T-SHIRT RED',
      slug: 'relaxed-fit-tshirt-red',
      description: 'Vibrant red tone. Designed to stand out. Rugged, durable, yet extremely soft.',
      price: 1599,
      primaryImage: '/photos/red-tshirt-studio-v2.png',
      hoverImage: '/photos/red-tshirt-street.png',
      tag: 'NEW',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'TOPS',
      stock: 100,
      featured: false,
    },
    {
      id: '6',
      name: 'ESSENTIAL HOODIE OLIVE',
      slug: 'essential-hoodie-olive',
      description: 'Deep olive tone. Heavyweight organic cotton crafted for the outdoors. Minimal branding.',
      price: 3499,
      primaryImage: '/photos/olive-hoodie-studio.png',
      hoverImage: '/photos/olive-hoodie-street.png',
      tag: 'LIMITED',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'OUTERWEAR',
      stock: 50,
      featured: true,
    }
  ]

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        primaryImage: p.primaryImage,
        hoverImage: p.hoverImage,
        tag: p.tag,
        sizes: p.sizes,
        category: p.category,
        stock: p.stock,
        featured: p.featured,
      },
      create: p,
    })
    console.log(`Created/Updated product: ${product.name}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
