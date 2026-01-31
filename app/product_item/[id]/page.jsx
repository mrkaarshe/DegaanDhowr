'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Button, 
  Input, 
  Badge 
} from '@/components/ui'

import { 
  Minus, Plus, ShoppingCart, Check, ChevronLeft, 
  ShieldCheck, Truck, Star, ArrowRight, Share2 
} from 'lucide-react'
import { products } from '@/lib/products'
import { useCart } from '@/context/cart-context'

export default function ProductItemPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const product = products.find(
    (p) => p.id === parseInt(params.id) && p.type === 'single'
  )

  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.type === 'single' && p.id !== product?.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <div className="text-center bg-white p-12 rounded-[32px] shadow-sm border border-gray-100">
          <h1 className="text-2xl font-black mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button className="bg-[#00C985] text-white rounded-xl px-8 h-12">Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#FBFBFA] pt-28 pb-20">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#00C985] transition-all group"
        >
          <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-[#00C985]/30 shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </div>
          Back to Shop
        </Link>
        <button className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#00C985] transition-all shadow-sm">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-[40px] overflow-hidden bg-white border border-gray-100 shadow-sm group">
            <img 
              src={product.image || '/placeholder.svg'} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-6 right-6">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20">
                <p className="text-[10px] font-black text-[#00C985] uppercase">In Stock</p>
              </div>
            </div>
          </div>
          
          {/* Service Highlights */}
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#00C985]/10 flex items-center justify-center text-[#00C985]">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">Fast Delivery</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Within 24 Hours</p>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#00C985]/10 flex items-center justify-center text-[#00C985]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">Quality Assured</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">100% Genuine</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col py-4">
          <div className="mb-10">
            <Badge className="bg-[#00C985]/10 text-[#00C985] border-none px-3 py-1 mb-4 font-bold text-[10px] tracking-wider uppercase">
              {product.code}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm w-fit">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Price</p>
                <p className="text-4xl font-black text-[#00C985] tracking-tighter">${product.price}</p>
              </div>
              <div className="w-[1px] h-10 bg-gray-100" />
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-xs font-bold text-gray-400">Trusted by 1k+ clients</p>
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-[#00C985]/20 pl-6 py-2">
              {product.description || "Our high-performance cleaning products are specifically formulated to handle tough stains while being gentle on surfaces. Perfect for both commercial and home use."}
            </p>
          </div>

          {/* Quantity & Cart Action */}
          <div className="space-y-4 mt-auto">
            <p className="text-xs font-bold text-gray-400 uppercase px-2">Select Quantity</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-white border border-gray-100 p-2 rounded-[20px] shadow-sm w-full sm:w-auto justify-between">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="w-11 h-11 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-[#00C985] hover:text-white transition-all active:scale-90"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  className="w-14 text-center bg-transparent font-black text-gray-900 text-lg focus:outline-none" 
                  readOnly 
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="w-11 h-11 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-[#00C985] hover:text-white transition-all active:scale-90"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                onClick={handleAddToCart} 
                className={`flex-1 h-16 rounded-[20px] text-lg font-bold shadow-xl transition-all duration-300 active:scale-95 ${
                  isAdded ? 'bg-black shadow-black/20' : 'bg-[#00C985] hover:bg-[#00b377] shadow-[#00C985]/20'
                } text-white w-full`}
              >
                {isAdded ? (
                  <><Check className="w-6 h-6 mr-3" /> Added Successfully</>
                ) : (
                  <><ShoppingCart className="w-6 h-6 mr-3" /> Add to Shopping Cart</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS - Compact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t mt-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">You May Also Like</h2>
            <p className="text-gray-500 mt-2 font-medium">Complete your cleaning set with these top products.</p>
          </div>
          <Link href="/products" className="font-bold text-sm text-[#00C985] hover:underline flex items-center gap-2">
            Browse All Products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <div key={p.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
               <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
               </div>
               <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold text-[#00C985] uppercase tracking-widest">{p.code}</p>
                    <span className="text-sm font-black text-gray-900">${p.price}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm truncate mb-4 group-hover:text-[#00C985] transition-colors">
                    {p.title}
                  </h3>
                  <Link href={`/product_item/${p.id}`}>
                    <Button variant="ghost" className="w-full rounded-xl bg-gray-50 hover:bg-[#00C985] hover:text-white text-xs font-bold transition-all">
                      View Details
                    </Button>
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}