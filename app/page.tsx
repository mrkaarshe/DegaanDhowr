

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
  const [currentSlide, setCurrentSlide] = useState(0)
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
    const slides = [
    "https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/488051972_970982855233931_5361198965868680905_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VV7hX_BmSJsQ7kNvwFqnLop&_nc_oc=Admr8dAc1OQWVzxM0AxZXbC_JkQ1QmznSMcHQV7Rd7Z8B9dKvTA1FbHfXgAx3CeFg6U&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=Eqw30JWdthRS1b_sC_8EnQ&oh=00_AftDgGHPokD18dPINsYULOIdfqwuWYTdxtLKbBA9uOc_-g&oe=6988E32A",
    "https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/453046411_793396172992601_7775078400042446627_n.png?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=OWje2chtrTAQ7kNvwFO0eu4&_nc_oc=AdmtM2t62AOuejpCKr6-U265RkZJAVBf6wtOqemlu2MFglpXZjbDVaXJmqu6iAHA2KQ&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=KhneMhHlKhMeV9htBAzgHw&oh=00_AfsSoCKKmmv9a5QPvbiVJoZFSN8c36uWLVlDElsAYk79Kw&oe=69891186",
    "https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/473369274_1785974278888695_7388817838228049477_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=chlaJLo9OYEQ7kNvwHxsLV4&_nc_oc=AdncHynUSF1aGQdMCBtbSyvSwFcnIC_TnzdSuJLD-mdhGcEN-kDlUx2FepAnX1MCTKs&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=SloPSvC3l7OvDnAagjLezw&oh=00_Afv3Dj5weNUZgIAmEKaOCwiato6t-_PtTdcEZ35YaLlfjg&oe=6988B9A7",
    "https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/485760711_961188746213342_4616942072599496247_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=M1e8X1KUfXcQ7kNvwHghCnW&_nc_oc=AdlgAjEjm3bLnuYnSUTSHNuGLf1OF8H3mcXrlO9RzysSl7nxfJXuFyrduIF2vR8RAp0&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=3yVro8ojXp460oAIcuMhhQ&oh=00_Afuh_CTiNK3TksGUul4D8iHfOU24R7wnMoBcqxVjNlBZAg&oe=6988E233"

    ]
    const clients = [
    "https://online.siu.edu.so/pluginfile.php/1/theme_academi/logo/1720685942/SIU-LOGO-800x800.png",
    "https://admin.dtmca.so/wp-content/uploads/2025/09/yardemil.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuMcEjEXXVvvKlPKKXNL9kddQnSbVVMhu2A&s",
    "https://kulmie.com/media/cache/main_image_listing/custom/domain_1/image_files/2484_photo_5154.webp"
    ]

    useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])


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
  <section className="relative h-[90vh] md:h-[85vh] w-full overflow-hidden">
   
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 top-20 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={slide} 
              alt={`Slide ${idx + 1}`} 
              className="w-full h-full object-center object-cover" 
            />
            {/* Overlay to make it look professional */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
         <div className='overley w-full h-full blur-[2px] bg-green-400/60 opacity-50 absolute left-0 top-0 right-0 bottom-0'></div>
        {/* Hero Overlay Content (Optional: If you want text over image) */}
        <div className="absolute backdrop-blur-[5px]  z-10 inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-7xl mx-auto space-y-2 z-10 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-blue-100 text-green-600 rounded-full text-xs font-bold tracking-widest uppercase">
                ✨ We Are Degaan Shop
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-medium text-white leading-[1.1] tracking-tight">
                Feel Your Way <br /> For <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500/80 to-green-400">Freshness</span>
              </h1>
              
              <p className="text-gray-200 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
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
                      <img src={`${clients[i-1]}`} alt="client" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-green-500 flex items-center justify-center text-[10px] text-white font-black">
                    +65
                  </div>
                </div>
                <div className="text-left">
                   <p className="text-white text-sm font-bold">Our VIP Clients</p>
                   <p className="text-gray-200 text-xs">Trusted by 800+ companies</p>
                </div>
              </div>
            </div>

        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all ${currentSlide === i ? "w-8 bg-green-500" : "w-2 bg-white/50"}`}
                />
            ))}
        </div>
      </section>

      {/* ================= FEATURES SECTION (Below Hero) ================= */}
      <section className="relative z-20 -mt-4 md:-mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-gray-300 rounded-3xl p-8 text-center shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* ================= PRODUCTS ================= */}
      <section className="py-34 bg-white">
        <div className="container mx-auto px-1">
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
            {productss.slice(0, 4).map((product) => (
              <div key={product.name} className="group">
                <Card className="overflow-hidden border border-gray-100 bg-white p-3 rounded-[1.5rem] hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 group">
                  
                  {/* Image Section */}
                  <Link href={`/shop/product/detail/${product.code}`}>
                    <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-[#F9F9F9]">
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
              <div className="relative min-h-50 md:aspect-video  rounded-4xl md:rounded-[3rem] overflow-hidden bg-black  border-8 border-gray-50">
                <iframe
                  key={activeVideo}
                  src={`https://www.youtube.com/embed/${videoTestimonials[activeVideo].videoUrl.split('/').pop()}`}
                  className="w-full h-full object-cover aspect-square"
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

