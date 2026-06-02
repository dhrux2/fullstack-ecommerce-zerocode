import prisma from '@/lib/prisma'
import ClientProductDetail from '@/components/ClientProductDetail'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const product = await prisma.product.findUnique({
    where: { slug }
  })

  if (!product) {
    notFound()
  }

  return <ClientProductDetail product={product} />
}
