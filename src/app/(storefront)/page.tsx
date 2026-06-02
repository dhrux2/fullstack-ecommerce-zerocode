import prisma from '@/lib/prisma'
import ClientHome from '@/components/ClientHome'

export default async function HomePage() {
  // Fetch featured products from the live database
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 4,
  })

  return <ClientHome featuredProducts={featuredProducts} />
}
