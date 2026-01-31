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
      <section className=" pt-12 pb-16 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className='flex justify-center items-center '>
            <h1 className='bg-green-300/40 mb-3 p-1 w-20 rounded-xl text-xs text-center flex justify-center items-center'>Gallery</h1>
          </div>
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
   <div className="py-12 px-6">
      
            {/* Products Grid */}
            <section className="py-12">
              <div className="container mx-auto px-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div  key={product.id} className=" transition-all duration-300 rounded-2xl overflow-hidden ">
                      {/* Compact Image Area */}
                      <div className="relative aspect-[4/3] overflow-hidden ">
                        <img
                          src={product.image || '/placeholder.svg'}
                          className="w-full h-full  rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={product.title}
                        />
                        {product.type === 'package' && (
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#00C985] text-[10px] font-black px-2 py-1 rounded-md shadow-sm flex items-center gap-1 uppercase">
                            <Package className="w-3 h-3" /> Package
                          </div>
                        )}
                        
                      </div>
      
                      {/* Content Area - More Compact */}
                      <div className="py-5 space-y-2">
                        <div className="flex justify-between  items-center">
                          <div>
                            <p className="text-[10px] font-bold text-[#00C985] uppercase tracking-wider">{product.code}</p>
                            <h3 className="text-md font-bold text-gray-900 line-clamp-1 group-hover:text-green-500/80 transition-colors">
                              {product.title}
                            </h3>
                          </div>
                          <span className="text-lg font-bold text-gray-900">
                            ${product.package_price || product.price}
                          </span>
                        </div>
      
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-10">
                          {product.description}
                        </p>
      
                        <div className="pt-2 mt-3 flex items-center justify-between space-x-2">
                          <Link 
                            href={product.type === 'package' ? `/package_items/${product.id}` : `/product_item/${product.id}`}
                            className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold py-2 bg-gray-200/90 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Info className="w-3 h-3" /> VIEW DETAILS
                          </Link>
                          {/* Quick Action Button - Floating */}
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className={` bg-green-300 w-1/2 py-1.5 rounded-full flex items-center justify-center 
                             transition-all transform active:scale-95 ${
                            addedItems[product.id] ? '' : 'bg-green-500/80 hover:bg-green-500/60 text-white hover:text-white'
                          }`}
                        >
                          {addedItems[product.id] ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
    
    </div>
  
    </main>
  )
}