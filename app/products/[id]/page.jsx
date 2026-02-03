'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Minus, Plus, ShoppingCart, Check, ChevronLeft } from 'lucide-react'
import { products } from '@/lib/products'
import { useCart } from '@/context/cart-context'

export default function ProductDetailsPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  // Halkan params.id ayaa laga helaa URL
  const product = products.find((p) => p.id === parseInt(params.id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-white">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      code: product.code,
      price: product.price,
      package_price: product.package_price,
      image: product.image,
      type: product.type,
      items: product.items,
      quantity: quantity,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/90 mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <section className="py-8 md:py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="w-full h-96 md:h-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.is_discount_time && (
            <Badge className="absolute top-4 left-4 bg-primary text-white text-sm font-bold py-2 px-3">
              Limited Offer
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-2">
              Code: {product.code}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-100 p-6 rounded-lg">
            {product.is_discount_time ? (
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">${product.discount_price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.price}</span>
                </div>
                <p className="text-green-600 font-semibold text-sm">
                  Save ${(product.price - product.discount_price).toFixed(2)}
                </p>
              </div>
            ) : (
              <span className="text-4xl font-bold text-primary">
                ${product.package_price || product.price}
              </span>
            )}
          </div>

          {/* Package Items */}
          {product.type === 'package' && product.items && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-4">What's Included:</h3>
              <div className="space-y-3">
                {product.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-200 rounded">
                <Minus className="w-4 h-4" />
              </button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-0 bg-gray-100 focus:ring-0"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-200 rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className={`transition-all text-lg ${
                isAdded ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary hover:bg-primary/90 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((related) => (
                <Card key={related.id} className="hover:shadow-lg transition-shadow">
                  <div className="w-full h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{related.title}</h3>
                    <p className="text-primary font-semibold mt-1">${related.package_price || related.price}</p>
                    <Link href={`/products/${related.id}`}>
                      <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-white">View Product</Button>
                    </Link>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
