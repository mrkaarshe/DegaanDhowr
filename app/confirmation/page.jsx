import { redirect } from 'next/navigation'

export default function ConfirmationRedirect() {
  redirect('/shop/checkout/confirmation')
}
