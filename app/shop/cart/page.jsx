'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Minus, Plus, ChevronLeft, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { ASSET_BASE_URL } from '@/lib/api/config'

export default function CartPage() {
  const router = useRouter()
  const { state, removeItem, updateQuantity, cartTotal } = useCart()

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6 py-20">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Looks like you haven't added any items yet. Start shopping to find amazing cleaning products and packages!
            </p>
            <Link href="/shop/products">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/shop/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/90 mb-4">
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => {
              const itemId = item.name || item.code || item.id
              const itemPrice = item.package_price || item.price || 0
              const isPackage = item.type === 'package'
              
              return (
                <Card key={itemId} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.image?.startsWith('http') ? item.image : `${ASSET_BASE_URL}${item.image || ''}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm text-gray-500">Code: {item.code || itemId}</p>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(itemId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Package Items Display - Read-only sub-list */}
                        {isPackage && item.items && Array.isArray(item.items) && item.items.length > 0 && (
                          <div className="mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-700 mb-2 text-sm">Package includes:</p>
                            <div className="space-y-2">
                              {item.items.map((subItem, idx) => {
                                const subItemCode = subItem.code || subItem.item_code || subItem.name
                                const subItemTitle = subItem.title || subItem.name
                                const subItemQty = subItem.quantity || 1
                                
                                return (
                                  <div key={idx} className="flex items-center gap-3 text-sm bg-white p-2 rounded border border-gray-100">
                                    {/* Sub-item image */}
                                    {subItem.image && (
                                      <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        <img
                                          src={subItem.image?.startsWith('http') ? subItem.image : `${ASSET_BASE_URL}${subItem.image}`}
                                          alt={subItemTitle}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                    
                                    {/* Sub-item info */}
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-gray-800 truncate">{subItemTitle}</p>
                                      <p className="text-xs text-gray-500">Code: {subItemCode}</p>
                                    </div>
                                    
                                    {/* Sub-item quantity (read-only) */}
                                    <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                      Qty: {subItemQty}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Price & Quantity */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-gray-100 w-fit rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(itemId, Math.max(1, (item.quantity || 1) - 1))}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(itemId, (item.quantity || 1) + 1)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ${(itemPrice * (item.quantity || 1)).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${itemPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Breakdown */}
                <div className="space-y-2 pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${(cartTotal * 0.01).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(cartTotal * 1.01).toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={() => router.push('/shop/checkout/payment')}
                  className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6"
                >
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-secondary bg-transparent"
                  onClick={() => router.push('/shop/products')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 text-sm text-gray-500">
              <p>Need help? Contact our <Link href="/contact" className="text-primary hover:underline">support team</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
