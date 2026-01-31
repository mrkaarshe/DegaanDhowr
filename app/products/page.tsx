'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Package, Plus, Check, Info } from 'lucide-react'
import { products } from '@/lib/products'
import { useCart } from '@/context/cart-context';

export default function ProductsPage() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<'All' | 'Products' | 'Packages'>('All')
  const [search, setSearch] = useState('')
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === 'All' ? true : activeCategory === 'Packages' ? p.type === 'package' : p.type !== 'package'
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      title: product.title,
      code: product.code,
      price: product.price,
      package_price: product.package_price,
      image: product.image,
      type: product.type,
      items: product.items,
    })
    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.id]: false })), 1500)
  }

  return (
    <main className="min-h-screen bg-[#FBFBFA]">
      {/* Small & Modern Hero */}
      <section className="bg-green-200/40 pt-32 pb-16 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Premium Cleaning <span className="text-[#00C985]">Essentials</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base max-w-lg mx-auto">
            Everything you need for a professional-grade clean in one place.
          </p>
        </div>
      </section>

      {/* Modern Filter Bar */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            {['All', 'Products', 'Packages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-10 bg-gray-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#00C985]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                {/* Compact Image Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={product.image || '/placeholder.svg'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={product.title}
                  />
                  {product.type === 'package' && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#00C985] text-[10px] font-black px-2 py-1 rounded-md shadow-sm flex items-center gap-1 uppercase">
                      <Package className="w-3 h-3" /> Package
                    </div>
                  )}
                  {/* Quick Action Button - Floating */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
                      addedItems[product.id] ? 'bg-[#00C985] text-white' : 'bg-white text-gray-900 hover:bg-[#00C985] hover:text-white'
                    }`}
                  >
                    {addedItems[product.id] ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>

                {/* Content Area - More Compact */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-[#00C985] uppercase tracking-wider">{product.code}</p>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#00C985] transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      ${product.package_price || product.price}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-8">
                    {product.description}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href={product.type === 'package' ? `/package_items/${product.id}` : `/product_item/${product.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Info className="w-3 h-3" /> VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}