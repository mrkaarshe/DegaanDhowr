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
  Package, ShieldCheck, Truck, Star, Info, ArrowRight 
} from 'lucide-react'
import { products } from '@/lib/products.json'
import { useCart } from '@/context/cart-context'

export default function PackageDetailsPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const product = products.find(
    (p) => p.id === parseInt(params.id) && p.type === 'package'
  )

  // Helitaanka Packages-ka kale ee la midka ah (Related)
  const relatedPackages = useMemo(() => {
    return products
      .filter(p => p.type === 'package' && p.id !== product?.id)
      .slice(0, 4) // Waxaan soo bandhigaynaa 4 xabo oo yaryar
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-black mb-4 text-gray-900">Package Not Found</h1>
          <Link href="/products">
            <Button className="bg-[#00C985] hover:bg-[#00b377] text-white rounded-xl px-8">
              Back to Store
            </Button>
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
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 mb-8">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#00C985] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-[#00C985]/30 shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Store
        </Link>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* Left: Premium Image Gallery Container */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-sm group">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-6 left-6">
              <Badge className="bg-white/90 backdrop-blur-md text-[#00C985] border-none px-4 py-2 rounded-full shadow-sm font-black text-xs">
                PREMIUM PACKAGE
              </Badge>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <ShieldCheck className="w-5 h-5 text-[#00C985] mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">100% Original</p>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <Truck className="w-5 h-5 text-[#00C985] mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Fast Delivery</p>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                <Star className="w-5 h-5 text-[#00C985] mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Top Rated</p>
             </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-[#00C985] font-black text-xs tracking-[0.2em] uppercase mb-2 block">
              Product Code: {product.code}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black text-gray-900">
                ${product.package_price || product.price}
              </span>
              <div className="h-6 w-[1px] bg-gray-200" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-gray-400 font-medium">(4.8 / 5 Rating)</span>
            </div>
            <p className="text-gray-500 leading-relaxed text-lg">
              {product.description || "This exclusive package is designed for professional results. Get the best value for your cleaning needs with our curated selection of high-quality products."}
            </p>
          </div>

          {/* Items Included - The "What's inside" Box */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-8 mb-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-[#00C985] w-5 h-5" /> What's Included:
            </h3>
            <div className="space-y-4">
              {product.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00C985]" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">Standard Size</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-bold">x{item.quantity}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
            <div className="flex items-center bg-gray-100 p-2 rounded-2xl w-full sm:w-auto justify-between sm:justify-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#00C985] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input 
                type="number" 
                value={quantity} 
                className="w-12 text-center bg-transparent font-black text-gray-900" 
                readOnly 
              />
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#00C985] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button 
              onClick={handleAddToCart} 
              className={`flex-1 h-14 rounded-2xl text-lg font-bold shadow-lg shadow-[#00C985]/20 transition-all active:scale-95 ${
                isAdded ? 'bg-black' : 'bg-[#00C985] hover:bg-[#00b377]'
              } text-white w-full`}
            >
              {isAdded ? (
                <>
                <Check className="w-6 h-6 mr-2" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="w-6 h-6 mr-2" /> Add to Cart</>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS - Compact Cards Style */}
 <section className="container mx-auto px-6 py-24 border-t mt-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
             <span className="inline-block px-4 py-1.5 bg-[#00C985]/10 text-[#00C985] rounded-full text-sm font-medium mb-4">
            You May Also Like
          </span>
            <p className="text-gray-500 mt-2 font-medium">Complete your cleaning set with these top products.</p>
          </div>
          <Link href="/products" className="font-bold text-sm text-[#00C985] hover:underline flex items-center gap-2">
            Browse All Products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedPackages.map((p) => (
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