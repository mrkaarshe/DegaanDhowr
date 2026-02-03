'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, ArrowRight, Package, Plus, Info, Box, Check, 
  ShoppingBag, Loader2, AlertCircle, Star, ShieldCheck, 
  ThumbsUp, Play, Award, Clock, Truck, Leaf, Shield, 
  Eye,
  Zap
} from 'lucide-react'
import {Users,  DollarSign } from "lucide-react";



export default function Home() {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [productss, setProducts] = useState<any[]>([])
  const [activeVideo, setActiveVideo] = useState(0)
  const router = useRouter()
  const { addItem } = useCart()

  const API_URL = "/api/external/method/degaan_shop.degaan_shop.api.api.products"
  const BASE_URL = "http://192.168.8.11:8000"

  const features = [
    { icon: Sparkles, title: 'Premium Quality', description: 'Professional-grade cleaning solutions.' },
    { icon: Leaf, title: 'Eco Friendly', description: 'Safe for families and the environment.' },
    { icon: Shield, title: 'Trusted Service', description: 'Experienced and certified professionals.' },
    { icon: Truck, title: 'Fast Delivery', description: 'Quick response and on-time delivery.' },
  ]

  const videoTestimonials = [
    { id: 1, title: "Yerdameli Hospital Experience", author: "Ibrahim Maxamed Hassan", rating: 5, videoUrl: "https://youtu.be/YzD-sehSj8s", thumbnail: "/thumb1.jpg" },
    { id: 2, title: "Xooga Hospital Feedback", author: "Client Feedback", rating: 5, videoUrl: "https://youtu.be/gnuvOif7UGc", thumbnail: "/thumb2.jpg" },
    { id: 3, title: "SIU University Review", author: "Nur Ali Abdullahi", rating: 4, videoUrl: "https://youtu.be/Wct64lZ7WIE", thumbnail: "/thumb3.jpg" },
    { id: 4, title: "Ladan Hospital Review", author: "Dr. Abdullahi Ahmed", rating: 5, videoUrl: "https://youtu.be/cu2n2WCOnBQ", thumbnail: "/thumb4.jpg" },
    { id: 5, title: "Residential Service", author: "Maryan Siciid Mohamed", rating: 3, videoUrl: "https://youtu.be/0y7QBEZuepg", thumbnail: "/thumb5.jpg" },
    { id: 6, title: "Al Arabia University", author: "Mohamed Ibrahim Ali", rating: 5, videoUrl: "https://youtu.be/ks_nl9IuOuY", thumbnail: "/thumb6.jpg" },
    { id: 7, title: "Ummah Hospital View", author: "Ahmed Mohamed Hassan", rating: 4, videoUrl: "https://youtu.be/Ka3AZ-Ra9So", thumbnail: "/thumb7.jpg" }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`Status: ${response.status}`)
        const result = await response.json()
        const data = result.message?.data || result.message || []
        // Show only first 4 on home page
        setProducts(Array.isArray(data) ? data.slice(0, 8) : [])
      } catch (err: any) {
        setError("Failed to load products. Check connection.")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
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

  return (
    <main className="relative bg-white text-gray-900 overflow-hidden">
      
      {/* ================= HERO ================= */}
   <section className=" min-h-screen w-full bg-[#f1f5f2] overflow-hidden font-sans flex items-center">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-100/50 rounded-full blur-[100px] -z-10" />

        {/* Floating Icons with Opacity */}
        <div className="absolute top-40 left-20 opacity-[0.03] rotate-12 hidden lg:block">
          <ShieldCheck size={200} />
        </div>
        <div className="absolute bottom-40 right-[40%] opacity-[0.03] -rotate-12 hidden lg:block">
          <Zap size={150} />
        </div>

        <div className="container mx-auto px-6 pt-20">
          <div className="flex flex-col lg:flex-row items-center justify-evenly gap-5">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8 z-10 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-blue-100 text-green-600 rounded-full text-xs font-bold tracking-widest uppercase">
                ✨ We Are Degaan Shop
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-medium text-slate-800 leading-[1.1] tracking-tight">
                Feel Your Way <br /> For <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500/80 to-green-400">Freshness</span>
              </h1>
              
              <p className="text-slate-500 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience the epitome of cleanliness with Degaan. We provide top-notch cleaning 
                solutions tailored to your needs, ensuring your spaces shine.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <Link href="/products">
                  <button className="group flex items-center gap-3 bg-green-500/80 hover:bg-green-500 text-white px-10 py-5 rounded-full font-bold transition-all shadow-2xl shadow-green-200 active:scale-95">
                    OUR SERVICES
                    <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={18} />
                    </div>
                  </button>
                </Link>
                
                <button 
                  onClick={() => window.scrollTo({ top: 2500, behavior: 'smooth' })}
                  className="w-16 h-16 flex items-center justify-center bg-white rounded-full text-green-600 shadow-xl hover:scale-110 transition-transform border border-green-50"
                >
                  <Play fill="currentColor" size={24} className="ml-1" />
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="client" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-green-500 flex items-center justify-center text-[10px] text-white font-black">
                    +65
                  </div>
                </div>
                <div className="text-left">
                   <p className="text-slate-800 text-sm font-bold">Our VIP Clients</p>
                   <p className="text-slate-400 text-xs">Trusted by 800+ companies</p>
                </div>
              </div>
            </div>

            {/* Right Illustration (Bucket) */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center py-10">
              {/* Dynamic Background Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-green-500/10 rounded-full blur-[100px] -z-10" />
              
              {/* Blue Glass Shape */}
              <div className="absolute bottom-10 left-0 right-0 w-[80%] h-[60%] bg-green-500 rounded-[4rem] -z-10 rotate-[-3deg] shadow-2xl shadow-green-200" />
              
              <img 
                src="/HERO-removed.png" 
                alt="Cleaning Supplies" 
                
               className=" md:w-full absolute md:relative top-0 -right-10 md:right-0 max-w-[620px] md:max-w-[450px] lg:max-w-[550px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] z-10 transition-transform hover:scale-105 duration-700"
              />

              {/* Float Stats on Image */}
              <div className="absolute md: top-20 right-0 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/50 animate-bounce hidden md:block z-20">
                 <div className="flex items-center gap-3">
                   <div className="bg-green-100 p-2 rounded-xl text-green-600"><Award size={20}/></div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Success</p>
                     <p className="text-lg font-black">100%</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
<section className="relative mt-60 md:mt-0 md:absolute md:top-200 md:left-0 md:right-0  pt-30 md:py-20 pb-10 bg-muted/0">

<div className="container mx-auto mb px-0 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

{features.map((f, i) => (

<div

key={i}

className="bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl p-6 text-center hover:shadow-xl transition"

>

<div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-green-100 text-green-600">

<f.icon className="w-7 h-7" />

</div>

<h3 className="font-semibold text-lg">{f.title}</h3>

<p className="text-sm text-gray-600 mt-2">{f.description}</p>

</div>

))}

</div>

</section>
        </div>
      </section>

   

      {/* ================= PRODUCTS ================= */}
      <section className="py-34 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center mb-16 gap-6">
            <div className="text-center flex justify-center items-center flex-col">
              <span className="text-[#00C985] flex justify-center items-center bg-[#00C985]/10  text-center rounded-2xl font-medium text-sm uppercase tracking-wider mb-2 block">Our Essentials</span>
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900">Featured <span className="text-[#00C985]">Products</span></h2>
            </div>
            
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-gray-100 h-96 rounded-[2.5rem]" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-50 rounded-[2rem]">
              <AlertCircle className="mx-auto w-10 h-10 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : (
              <div className="container mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productss.slice(0, 6).map((product) => (
              <div key={product.name} className="group">
                <Card className="overflow-hidden border border-gray-100 bg-white p-3 rounded-[2.5rem] hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 group">
                  
                  {/* Image Section */}
                  <Link href={`/shop/product/detail/${product.code}`}>
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#F9F9F9]">
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
                    <div className="flex flex-col  mb-1">
                      <div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ">
                      {product.code || "DEGAAN-ITEM"}
                    </p>

                      </div>
                      <div className='flex justify-between items-center '>
                           <h3 className="text-[15px] font-extrabold tracking-wide text-gray-900 truncate group-hover:text-green-500/80 transition-colors">
                        {product.title}
                      </h3>
                      <span className="text-[16px] font-extrabold text-gray-900 tracking-tight">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      </div>
                      <div>
                      <p className="text-xs text-gray-400 line-clamp-1 mb-5 max-h-5">{product.description}</p>
                      </div>
                    </div>
                    
                  

                    {/* Buttons Row */}
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={(e) => handleAddToCart(product)}
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
                        <div className="w-12 h-12 border border-gray-100 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer">
                          <Eye className="w-5 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
</div>
          )}
          
        </div>
              <Link className='flex justify-center items-center mt-10' href="/products">
              <Button variant="outline" className="rounded-xl font-medium border-gray-200">
                View All Collection <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
        
      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        
        <div>
          <div className="text-center mb-16 space-y-4">
            <span className="px-4 py-2 bg-green-50 text-[#00C985] rounded-full text-xs font-medium uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-medium">Why <span className="text-[#00C985]">Degaan Shop</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Discover what makes our hygiene services stand out from the competition.</p>
          </div>
        </div>
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-[#00C985] rounded-[3rem] -z-10" />
            <img src="/whayChooseUS.jpg" alt="Excellence" className="rounded-[3rem] shadow-sm w-full h-[400px] md:h-[600px] object-cover" />
            <div className="absolute top-5 left-4 bg-white/70 backdrop-blur-md p-3 rounded-[2rem] shadow-2xl animate-bounce flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <ThumbsUp />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400 uppercase">Satisfaction</p>
                  <p className="text-2xl font-medium text-gray-900">99.9%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-[#00C985] font-medium text-sm uppercase tracking-widest">Why Degaan Shop</span>
            <h2 className="text-4xl md:text-6xl font-medium leading-tight text-gray-900">Best Hygiene <br/><span className="text-[#00C985]">Solutions</span> In Somalia</h2>
            <p className="text-gray-500 text-lg leading-relaxed">We deliver professional excellence using cutting-edge equipment and biodegradable products.</p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: Award, title: 'Certified Pros', desc: 'Expert trained staff' },
                { icon: Clock, title: '24/7 Support', desc: 'Always available' },
                { icon: Truck, title: 'Fast Response', desc: 'Quick service delivery' },
                { icon: ShieldCheck, title: 'Safe Products', desc: 'Non-toxic solutions' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 shrink-0 bg-green-50 text-[#00C985] rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (VIDEO) ================= */}
      <section className="py-14 bg-white">

        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="px-4 py-2 bg-green-50 text-[#00C985] rounded-full text-xs font-medium uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-medium">Customer <span className="text-[#00C985]">Voices</span></h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8">
              <div className="relative md:aspect-video  rounded-4xl md:rounded-[3rem] overflow-hidden bg-black  border-8 border-gray-50">
                <iframe
                  key={activeVideo}
                  src={`https://www.youtube.com/embed/${videoTestimonials[activeVideo].videoUrl.split('/').pop()}`}
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
              </div>
              <div className="mt-10 p-10 bg-gray-50 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#00C985] text-white rounded-2xl flex items-center justify-center text-2xl font-medium">
                    {videoTestimonials[activeVideo].author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{videoTestimonials[activeVideo].author}</h3>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < videoTestimonials[activeVideo].rating ? 'fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <ShieldCheck className="text-green-500 w-5 h-5" />
                  <span className="text-sm font-medium text-gray-600 italic">Verified Review</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {videoTestimonials.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all border-2 ${
                    activeVideo === index ? 'bg-white border-[#00C985] shadow-xl scale-[1.02]' : 'bg-gray-50 border-transparent hover:bg-white'
                  }`}
                >
                  <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0">
                    <img src={`https://img.youtube.com/vi/${video.videoUrl.split('/').pop()}/mqdefault.jpg`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className={`text-[10px] font-medium uppercase ${activeVideo === index ? 'text-[#00C985]' : 'text-gray-400'}`}>
                      {activeVideo === index ? 'Playing Now' : 'Up Next'}
                    </p>
                    <h4 className="text-sm font-medium line-clamp-1">{video.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{video.author}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C985; }
      `}</style>
    </main>
  )
}

