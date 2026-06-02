import prisma from '@/lib/prisma'
import ClientProducts from '@/components/ClientProducts'

export default async function ProductsPage() {
  const allProducts = await prisma.product.findMany()

  return <ClientProducts allProducts={allProducts} />
}
