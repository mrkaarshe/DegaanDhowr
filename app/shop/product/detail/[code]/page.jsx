'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui'
import { 
  Minus, Plus, ShoppingCart, Check, ChevronLeft, 
  Loader2, LayoutGrid, Sparkles, ShieldCheck, Zap, ArrowRight,
  PackageCheck,
  ShoppingBag
} from 'lucide-react'
import { useCart } from '@/context/cart-context'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const BASE_URL = "http://192.168.8.11:8000"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dRes = await fetch(`/api/external/method/degaan_shop.degaan_shop.api.api.product_detail?code=${params.code}`)
        const dResult = await dRes.json()
        
        if (dResult.message?.data) {
          setProduct(dResult.message.data)
          const aRes = await fetch("/api/external/method/degaan_shop.degaan_shop.api.api.products")
          const aResult = await aRes.json()
          const allItems = aResult.message?.data || aResult.message || []
          setRelated(allItems.filter(p => p.code !== params.code).slice(0, 4))
        }
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    if (params.code) fetchData()
  }, [params.code])

  const handleAddToCart = () => {
    if (!product) return
    addItem({ id: product.name, title: product.title, price: product.price, image: product.image, quantity })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin text-[#00C985]" />
    </div>
  )

  if (!product) return <div className="p-20 text-center font-bold text-gray-500">Product not found.</div>

  const isPackage = product?.type === 'package'

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-3 lg:pb-14 pt-4 lg:pt-4">
            <header className="pt-16 pb-6 bg-white border-b">
              <div className="container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>DEGAAN SHOP</span>
                </div>
                <h1 className="text-4xl font-black text-gray-900">Detail <span className="text-[#00C985]">Page</span></h1>
              </div>
            </header>
      <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - Responsive margin */}
        <Link href="/products" className="inline-flex items-center text-xs lg:text-sm font-medium text-gray-500 hover:text-black mb-6 lg:mb-10 transition-all group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>

        {/* Main Grid: 1 column on mobile, 12 columns on LG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Image Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[1.5rem] lg:rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm p-3 lg:p-8">
              <div className=" lg:aspect-[4/3] rounded-[1.2rem] lg:rounded-[2.5rem] overflow-hidden bg-[#F9F9F9] relative flex items-center justify-center">
                <img 
                  src={product.image?.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} 
                  alt={product.title} 
                  className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

           
            {isPackage && product.items?.length > 0 && (
              <div className="bg-white rounded-[1.5rem] lg:rounded-[2.5rem] p-5 lg:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-[#00C985]/10 rounded-xl text-[#00C985]">
                    <LayoutGrid size={20} />
                  </div>
                  <h3 className="font-black text-lg lg:text-xl text-gray-900 tracking-tight">Included in Bundle</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
                  {product.items.map((item, i) => (
                    <div key={i} className="group p-2 lg:p-3 rounded-2xl border border-gray-50 bg-[#FBFBFA] hover:bg-white hover:border-[#00C985]/30 transition-all duration-300">
                      <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-white border border-gray-50">
                        <img 
                          src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[10px] lg:text-[11px] font-black text-gray-800 line-clamp-1 uppercase tracking-tight">{item.title}</p>
                      <p className="text-[9px] text-[#00C985] font-bold">1 Unit</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Content Section */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                <span className={`px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-black tracking-widest uppercase shadow-sm ${isPackage ? 'bg-[#00C985] text-white' : 'bg-black text-white'}`}>
                  {isPackage ? 'Package' : 'Single Item'}
                </span>
                <span className="text-gray-400 font-bold text-[9px] lg:text-[10px] uppercase tracking-widest leading-none">SKU: {product.code}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 leading-[1] tracking-tighter uppercase">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                <div className="text-3xl lg:text-5xl font-black text-[#00C985]">${Number(product.price).toFixed(2)}</div>
                <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2 lg:px-3 py-1 rounded-lg">
                  <Sparkles size={14} fill="currentColor" />
                  <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider">Premium Selection</span>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm lg:text-base leading-relaxed border-l-4 border-[#00C985]/20 pl-4 lg:pl-6 italic max-w-xl">
              {product.description || "A masterfully designed piece, combining aesthetic beauty with everyday functionality for an elevated experience."}
            </p>

            {/* INCLUDES SECTION (Inside the right column) */}
                {isPackage && product.items?.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mt-8">
                    <div className="flex items-center gap-2 mb-4 text-[#00C985]">
                      <PackageCheck size={18} />
                      <h3 className="font-black text-xs uppercase tracking-widest">What's in the package?</h3>
                    </div>
                    <div className="space-y-3">
                      {product.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between group py-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 p-1">
                              <img src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-sm font-bold text-gray-700">{item.title}</span>
                          </div>
                          <span className="text-[10px] font-black text-gray-400">QTY: 01</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            {/* Actions: Stack on mobile, side-by-side on SM+ */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-0">
              <div className="flex items-center bg-white rounded-2xl p-1 border border-gray-200 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-[#00C985] hover:text-white transition-all"><Minus size={18}/></button>
                <span className="w-12 sm:w-14 text-center font-black text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-[#00C985] hover:text-white transition-all"><Plus size={18}/></button>
              </div>

              <Button 
                onClick={handleAddToCart}
                className={`w-full sm:flex-1 h-[60px] lg:h-[68px] rounded-2xl text-[12px] lg:text-[13px] font-black tracking-[0.1em] transition-all duration-500 shadow-xl ${
                  isAdded ? 'bg-black text-white' : 'bg-[#00C985] text-white hover:bg-black hover:-translate-y-1 active:scale-95'
                }`}
              >
                {isAdded ? <Check className="mr-2" /> : <ShoppingCart className="mr-2" size={20} />}
                {isAdded ? 'ADDED TO BAG' : 'ADD TO BAG'}
              </Button>
            </div>

            {/* Trust Badges - Grid for mobile */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-[#00C985]" /> 2-Year Warranty
              </div>
              <div className="flex items-center gap-2 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Zap size={16} className="text-[#00C985]" /> Instant Delivery
              </div>
            </div>
          </div>
        </div>

        {/* RELATED SECTION */}
{/* RELATED PRODUCTS - Card Styling Updates */}
      {related.length > 0 && (
  <section className="mt-32">
    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          You may also like
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#00C985] to-[#00FFA3] mt-2 rounded-full"></div>
      </div>
      <Link 
        href="/shop" 
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C985] text-white font-bold text-sm uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        View All <ArrowRight size={16} />
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-10">
      {related.map((p) => (
        <Link href={`/shop/product/detail/${p.code}`} key={p.code} className="group">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-gray-100 hover:border-[#00C985]/30 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            
            {/* Product Image */}
            <div className="bg-[#F9F9F9] rounded-2xl mb-5 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={p.image?.startsWith('http') ? p.image : `${BASE_URL}${p.image}`}
                className="w-full h-[150px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                alt={p.title}
              />
            </div>

            {/* Product Info */}
            <div className="px-1">
              <h4 className="font-bold text-gray-900 group-hover:text-[#00C985] transition-colors truncate text-base uppercase">
                {p.title}
              </h4>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{p.type}</span>
                <span className="font-extrabold text-gray-900 text-base">${Number(p.price).toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Add Button */}
            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
              <div className="w-10 h-10 bg-[#00C985] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Plus size={18} />
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