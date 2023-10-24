import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { ProductProps } from '@/context/ShopContext'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products } = req.body as { products: ProductProps[] }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (products.length === 0) {
    return res.status(406).json({ error: 'We need products in cart list.' })
  }

  const successUrl = `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = 'http://localhost:3000/'
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: item.amount,
      }
    }),
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
