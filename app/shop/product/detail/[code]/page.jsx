'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button, Badge } from '@/components/ui'
import { 
  Minus, Plus, ShoppingCart, Check, ChevronLeft, 
  Truck, ShieldCheck, RefreshCcw, Loader2, AlertCircle, Box, ArrowRight
} from 'lucide-react'
import { useCart } from '@/context/cart-context'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const BASE_URL = "http://192.168.8.11:8000"
  const DETAIL_API = `/api/external/method/degaan_shop.degaan_shop.api.api.product_detail?code=${params.code}`
  const ALL_PRODUCTS_API = "/api/external/method/degaan_shop.degaan_shop.api.api.products"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dRes = await fetch(DETAIL_API)
        const dResult = await dRes.json()
        
        if (dResult.message?.data) {
          setProduct(dResult.message.data)
          
          // Soo qaado Related Products
          const aRes = await fetch(ALL_PRODUCTS_API)
          const aResult = await aRes.json()
          const allItems = aResult.message?.data || aResult.message || []
          setRelated(allItems.filter(p => p.code !== params.code).slice(0, 4))
        } else {
          setError("Product not found.")
        }
      } catch (err) {
        setError("Connection failed.")
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-6 h-6 animate-spin text-[#00C985]" /></div>

  const isPackage = product?.type === 'package'

  return (
    <main className="min-h-screen bg-white pb-24 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigation */}
        <Link href="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-black mb-10 transition-colors">
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          
          {/* Left Side: Image */}
          <div className="bg-[#F8F8F8] rounded-[2.5rem] overflow-hidden aspect-square border border-gray-50">
            <img 
              src={product.image?.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col pt-2">
            
            {/* Package Label Header */}
            {isPackage && (
              <div className="flex items-center gap-2 mb-4 bg-[#00C985]/5 w-fit px-4 py-1.5 rounded-full border border-[#00C985]/10">
                <Box size={14} className="text-[#00C985]" />
                <span className="text-[11px] font-black text-[#00C985] uppercase tracking-widest">
                  Package • {product.items?.length || 0} items included
                </span>
              </div>
            )}

            <p className="text-[10px] font-bold text-gray-300 mb-1 uppercase tracking-widest leading-none">SKU: {product.code}</p>
            <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-black text-black">${Number(product.price).toFixed(2)}</span>
              {product.has_discount && (
                <span className="bg-[#00C985] text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase">
                  Save ${product.discount_price}
                </span>
              )}
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-md">
              {product.description}
            </p>

            {/* TRUST CARDS (Flex Card Layout) */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: ShieldCheck, text: "2 Year Warranty" },
                { icon: RefreshCcw, text: "Easy Returns" }
              ].map((item, i) => (
                <div key={i} className="flex-1 min-w-[130px] bg-[#FBFBFA]  border border-gray-100 p-4 rounded-2xl flex flex-col items-start gap-3 transition-hover hover:border-[#00C985]/20">
                  <item.icon size={20} className="text-[#00C985] flex justify-center items-center" />
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-50">
              <div className="flex items-center bg-[#F8F8F8] rounded-2xl p-1 w-full sm:w-36 justify-between border border-gray-100">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Minus size={16}/></button>
                <span className="font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Plus size={16}/></button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className={`flex-1 h-14 rounded-2xl text-[14px] font-black tracking-wide transition-all duration-500 ${
                  isAdded ? 'bg-[#00C985] text-white shadow-[#00C985]/20' : 'bg-[#00C985] text-white hover:bg-[#00C985]/90 shadow-xl shadow-black/5'
                }`}
              >
                {isAdded ? <Check className="mr-2" /> : <ShoppingCart className="mr-2" size={18} />}
                {isAdded ? 'SUCCESSFULLY ADDED' : 'ADD TO CART'}
              </Button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {related.length > 0 && (
          <section className="pt-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">You May Also Like</h2>
                <div className="h-1 w-12 bg-[#00C985] mt-2 rounded-full" />
              </div>
              <Link href="/shop" className="text-xs font-bold text-gray-400 flex items-center gap-1 hover:text-black transition-colors">
                SEE ALL <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link href={`/shop/product/detail/${p.code}`} key={p.name} className="group">
                  <div className="bg-white rounded-[2rem] border border-gray-100 p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/40">
                    <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-[#F8F8F8] mb-4">
                      <img 
                        src={p.image?.startsWith('http') ? p.image : `${BASE_URL}${p.image}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={p.title}
                      />
                    </div>
                    
                    <div className="px-2 pb-2">
                      <h4 className="font-bold text-gray-800 group-hover:text-[#00C985] transition-colors truncate text-sm">{p.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                         <span className="text-[10px] font-bold text-gray-400 uppercase">{p.type}</span>
                         <span className="font-black text-gray-900 text-sm">${Number(p.price).toFixed(2)}</span>
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