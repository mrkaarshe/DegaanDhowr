'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Search, ShoppingBag, Loader2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { getProducts } from '@/lib/api/services/products'
import ProductCard from '@/components/product-card'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<'All' | 'Products' | 'Packages'>('All')
  const [search, setSearch] = useState('')
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const result = await getProducts()
        setProducts(Array.isArray(result.data) ? result.data : [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    // Pass full product object
    addItem(product)

    setAddedItems((prev) => ({ ...prev, [product.name]: true }))
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.name]: false })), 1200)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const type = (p.type || '').toLowerCase()
      const matchCategory =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Packages'
          ? type === 'package'
          : type === 'item'

      const matchSearch = (p.title || '').toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search, products])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#00C985] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading collection...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-20">
      {/* OLD-STYLE HEADER */}
      <header className="pt-16 pb-12 bg-white border-b">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>DEGAAN SHOP</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900">
            Modern <span className="text-[#00C985]">Collections</span>
          </h1>

          <div className="mt-4">
            <Link href="/shop/cart" className="text-sm font-bold text-[#00C985] hover:text-black">
              View cart
            </Link>
          </div>
        </div>
      </header>

      {/* OLD-STYLE STICKY FILTER NAV */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b py-4 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
            {(['All', 'Products', 'Packages'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 md:flex-none px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-gray-900 shadow-md scale-[1.02]'
                    : 'text-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              className="pl-12 h-12 bg-gray-50 border-none rounded-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* OLD-STYLE GRID CONTAINER */}
      <div className="container mx-auto px-6 mt-12">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 text-center text-gray-600">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                isAdded={!!addedItems[product.name]}
                onAdd={(e) => handleAddToCart(e, product)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
