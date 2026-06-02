import Stripe from 'stripe'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

async function checkStripe() {
  try {
    const account = await stripe.balance.retrieve()
    console.log('Successfully connected to Stripe!')
    console.log('Stripe mode:', account.livemode ? 'LIVE' : 'TEST')
  } catch (error: any) {
    console.error('Failed to connect to Stripe:', error.message)
  }
}

checkStripe()
