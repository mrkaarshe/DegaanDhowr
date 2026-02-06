'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui'
import { Minus, Plus, ShoppingCart, Check, ChevronLeft, Loader2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { getProductDetail, getProducts } from '@/lib/api/services/products'
import { ASSET_BASE_URL } from '@/lib/api/config'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)


  // NEW: for package gallery
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const code = params.code
        if (!code) return

        const detailResult = await getProductDetail(String(code))
        if (detailResult.ok && detailResult.data) {
          setProduct(detailResult.data)

          // reset gallery selection when product changes
          setSelectedItemIndex(0)

          const productsResult = await getProducts()
          if (productsResult.ok && Array.isArray(productsResult.data)) {
            const allItems = productsResult.data
            setRelated(allItems.filter((p) => p.code !== code).slice(0, 6))
          }
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.code) fetchData()
  }, [params.code])

  const handleAddToCart = () => {
    if (!product) return
    // Pass full product object with quantity
    addItem({
      ...product,
      quantity: quantity
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Move all hooks before early returns to maintain hook order
  const isPackage = product?.type === 'package'
  const hasPackageItems = isPackage && Array.isArray(product?.items) && product?.items.length > 0

  const productImgSrc = useMemo(() => {
    if (!product?.image) return ''
    return product.image.startsWith('http')
      ? product.image
      : `${ASSET_BASE_URL}${product.image}`
  }, [product?.image])

  const selectedItem = useMemo(() => {
    if (!hasPackageItems || !product?.items) return null
    const idx = Math.min(Math.max(selectedItemIndex, 0), product.items.length - 1)
    return product.items[idx]
  }, [hasPackageItems, product?.items, selectedItemIndex])

  const featuredImgSrc = useMemo(() => {
    if (selectedItem?.image) {
      return selectedItem.image.startsWith('http')
        ? selectedItem.image
        : `${ASSET_BASE_URL}${selectedItem.image}`
    }
    return productImgSrc
  }, [selectedItem, productImgSrc])

  const featuredAlt = useMemo(() => {
    return selectedItem?.title || product?.title || ''
  }, [selectedItem?.title, product?.title])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#00C985]" />
      </div>
    )
  }

  if (!product) return <div className="p-20 text-center font-bold text-gray-500">Product not found.</div>

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-6 pb-14">
      <br /><br /><br /><br />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/shop/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black mb-6"
        >
          <ChevronLeft size={16} /> Back to products
        </Link>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image + (NEW) Gallery thumbnails for package */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-50">
                <img
                  src={featuredImgSrc}
                  alt={featuredAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* NEW: Thumbnails for package items */}
            {hasPackageItems && (
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3">
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.items.map((item, i) => {
                    const thumbSrc = item.image && item.image.startsWith('http')
                      ? item.image
                      : `${ASSET_BASE_URL}${item.image}`

                    const active = i === selectedItemIndex

                    return (
                      <button
                        key={`${item.code || item.name || item.title}-${i}`}
                        type="button"
                        onClick={() => setSelectedItemIndex(i)}
                        className={[
                          "shrink-0 w-16 h-16 rounded-lg border overflow-hidden bg-gray-50",
                          active ? "border-[#00C985] ring-2 ring-[#00C985]/20" : "border-gray-200 hover:border-gray-300"
                        ].join(" ")}
                        aria-label={`Select ${item.title}`}
                      >
                        <img
                          src={thumbSrc}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Tap an item image to preview it
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-[#00C985]/10 text-[#00C985]">
                  {isPackage ? 'Package' : 'Item'}
                </span>
                <span className="text-xs text-gray-500 font-medium">Code: {product.code}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="mt-3 text-2xl font-extrabold text-gray-900">
                ${Number(product.price).toFixed(2)}
              </div>

              {product.description && (
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
              )}

              {/* Quantity + Add */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center justify-between sm:justify-start bg-gray-50 border border-gray-200 rounded-lg p-1 w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md hover:bg-white flex items-center justify-center"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md hover:bg-white flex items-center justify-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className={`w-full sm:flex-1 h-12 rounded-lg font-bold ${isAdded ? 'bg-black text-white' : 'bg-[#00C985] text-white hover:bg-black'
                    }`}
                >
                  {isAdded ? <Check className="mr-2" /> : <ShoppingCart className="mr-2" size={18} />}
                  {isAdded ? 'Added' : 'Add product'}
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li>✅ Fast delivery</li>
                <li>✅ Quality Products</li>
                <li>✅ 24/7 customer support available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Package Items Table (Enhanced columns) */}
        {hasPackageItems && (
          <section className="mt-10">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">Package items</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 font-bold">Item</th>
                      <th className="py-2 font-bold">Code</th>
                      <th className="py-2 font-bold">Description</th>
                      <th className="py-2 font-bold w-20">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.items.map((item, i) => (
                      <tr
                        key={`${item.code || item.name || item.title}-${i}`}
                        className="border-b last:border-b-0 hover:bg-gray-50/60 cursor-pointer"
                        onClick={() => setSelectedItemIndex(i)}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                              <img
                                src={item.image?.startsWith('http') ? item.image : `${ASSET_BASE_URL}${item.image}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="font-semibold text-gray-800">{item.title}</div>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600 font-medium">
                          {item.code || item.item_code || item.name || '-'}
                        </td>
                        <td className="py-3 text-gray-600">
                          <span className="line-clamp-2">
                            {item.description || item.short_description || '-'}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-gray-700">1</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Tip: click a row to preview that item in the image gallery.
              </p>
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Related products</h2>
              <Link href="/shop/products" className="text-sm font-bold text-[#00C985] hover:text-black">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.code} href={`/shop/products/detail/${p.code}`} className="group">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="h-36 bg-gray-50">
                      <img
                        src={p.image?.startsWith('http') ? p.image : `${ASSET_BASE_URL}${p.image}`}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-[#00C985]">
                        {p.title}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span className="uppercase font-semibold">{p.type}</span>
                        <span className="text-gray-900 font-extrabold">${Number(p.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
