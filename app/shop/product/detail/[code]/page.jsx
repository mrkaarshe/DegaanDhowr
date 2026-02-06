import { redirect } from 'next/navigation'

export default function ProductDetailRedirect({ params }: { params: { code: string } }) {
  redirect(`/shop/products/detail/${params.code}`)
}
