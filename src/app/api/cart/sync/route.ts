import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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


    await prisma.cartItem.deleteMany({
      where: { userId: user.id }
    })

    if (items && items.length > 0) {
      const dbItems = items.map((item: any) => ({
        userId: user.id,
        productId: item.productId,
        quantity: item.quantity,
        size: item.size
      }))

      await prisma.cartItem.createMany({
        data: dbItems
      })
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    return NextResponse.json({ error: 'Cart sync exception' }, { status: 500 })
  }
}
