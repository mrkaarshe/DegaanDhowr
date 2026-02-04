'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'
import { 
  Search, Package, Plus, Check, Box, ShoppingBag, 
  Loader2, AlertCircle, ShoppingCart, Eye 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<'All' | 'Products' | 'Packages'>('All')
  const [search, setSearch] = useState('')
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})
  
  const { addItem } = useCart()
  const router = useRouter()

  const API_URL = "/api/external/method/degaan_shop.degaan_shop.api.api.products"
  const BASE_URL = "http://127.0.0.1:8000"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`Status: ${response.status}`)
        const result = await response.json()
        const data = result.message?.data || result.message || []
        setProducts(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() 
    addItem({
      id: product.name,
      title: product.title,
      code: product.code,
      price: product.price,
      image: product.image,
      type: product.type,
    })
    setAddedItems((prev) => ({ ...prev, [product.name]: true }))
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.name]: false })), 1500)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const type = p.type?.toLowerCase()
      const matchCategory =
        activeCategory === 'All' ? true : 
        activeCategory === 'Packages' ? type === 'package' : 
        type === 'item'
      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, search, products])

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-[#00C985] animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Loading collection...</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-20">
      <header className="pt-16 pb-12 bg-white border-b">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>DEGAAN SHOP</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900">Modern <span className="text-[#00C985]">Collections</span></h1>
        </div>
      </header>

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b py-4 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
            {['All', 'Products', 'Packages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`flex-1 md:flex-none px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat ? 'bg-white text-gray-900 shadow-md scale-105' : 'text-gray-500'
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.name} className="group">
    <Card className="overflow-hidden border border-gray-100 bg-white p-3 rounded-[1.5rem] hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 group">
                  
                  {/* Image Section */}
                  <Link href={`/shop/product/detail/${product.code}`}>
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#F9F9F9]">
                      <img
                        src={product.image?.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Minimal Badge */}
                      <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-2xl flex items-center gap-2 text-[10px] font-black tracking-widest border border-white/20 shadow-sm backdrop-blur-md ${
                        product.type === 'package' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-white/90 text-gray-900'
                      }`}>
                        {product.type === 'package' ? <Package size={12} /> : <Box size={12} />}
                        {product.type.toUpperCase()}
                      </div>
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="mt-0 px-2 pb-2">
                    <div className="flex flex-col ">
                      <div>
                      <p className="text-[10px] font-bold text-green-500 uppercase  ">
                      {product.code || "DEGAAN-ITEM"}
                    </p>

                      </div>
                      <div className='flex justify-between items-center '>
                           <h3 className="text-sm font-bold text-gray-900 truncate  transition-colors">
                        {product.title}
                      </h3>
                      <span className="text-[16px] font-bold text-slate-900 tracking-tight">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      </div>
                      <div>
                      <p className="text-[10px] max-w-70 text-gray-400 line-clamp-1 mb-5 max-h-5">{product.description}</p>
                      </div>
                    </div>
                    
                  

                    {/* Buttons Row */}
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={(e) => handleAddToCart(e,product)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-[10px] tracking-[0.1em] transition-all duration-300 active:scale-95 ${
                          addedItems[product.name] 
                          ? 'bg-black text-white' 
                          : 'bg-green-500/80 text-white hover:bg-green-600/90 shadow-lg shadow-green-500/20'
                        }`}
                      >
                        {addedItems[product.name] ? (
                          <>
                            <Check className="w-4 h-4" /> ADDED
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> ADD TO CART
                          </>
                        )}
                      </button>

                      <Link href={`/shop/product/detail/${product.code}`}>
                        <div className="w-12 h-12 border border-gray-300 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer">
                          <Eye className="w-5 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </Card>
          </div>
        ))}
      </div>
    </main>
  )
}