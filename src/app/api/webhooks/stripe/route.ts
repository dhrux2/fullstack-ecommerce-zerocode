import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string

    let event: Stripe.Event

    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret is not configured' }, { status: 500 })
    }

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      return NextResponse.json({ error: 'Webhook signature exception' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      })

      const userId = session.metadata?.userId

      if (userId) {
        await prisma.order.create({
          data: {
            userId: userId,
            status: 'PROCESSING',
            total: (session.amount_total || 0) / 100,
            stripeId: session.id,
          }
        })
        
        await prisma.cartItem.deleteMany({
          where: { userId }
        })
      }
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    return NextResponse.json({ error: 'Webhook execution exception' }, { status: 500 })
  }
}
