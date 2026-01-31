'use client'

import React from "react"

import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CartProvider, useCart } from '@/context/cart-context'

function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { cartCount } = useCart()

  return (
    <>
      <Navbar cartCount={cartCount} />
      {children}
      <Footer />
    </>
  )
}

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
      <Analytics />
    </CartProvider>
  )
}
