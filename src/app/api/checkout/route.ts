import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch (error) {}
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const productIds = items.map((item: any) => item.productId)
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    })
    
    const productMap = new Map(dbProducts.map(p => [p.id, p]))
    const lineItems = []

    for (const item of items) {
      const dbProduct = productMap.get(item.productId)
      
      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 404 })
      }
      
      if (item.quantity > dbProduct.stock) {
        return NextResponse.json({ error: `Some items in your cart just sold out!` }, { status: 409 })
      }

      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: dbProduct.name,
            images: [dbProduct.primaryImage.startsWith('http') ? dbProduct.primaryImage : `${origin}${dbProduct.primaryImage}`],
            metadata: {
              productId: dbProduct.id,
              size: item.size,
            }
          },
          unit_amount: Math.round(dbProduct.price * 100),
        },
        quantity: item.quantity,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'], // Delivering all over India
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        userId: user.id,
      }
    })

    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    return NextResponse.json({ error: 'Checkout gateway exception' }, { status: 500 })
  }
}
