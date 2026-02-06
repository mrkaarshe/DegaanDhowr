import { redirect } from 'next/navigation'

export default function PaymentRedirect() {
  redirect('/shop/checkout/payment')
}
