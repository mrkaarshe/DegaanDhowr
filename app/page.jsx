'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart,Package,Plus,Info } from 'lucide-react'

import { useCart } from '@/context/cart-context'
import { Badge } from 'lucide-react'

import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Star,
  Truck,
  Shield,
  Award,
  Clock,
  Leaf,
  ShieldCheck,
  ThumbsUp,
  Play,
  Check

} from 'lucide-react'
import { products, testimonials } from '@/lib/products'

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [addedItems, setAddedItems] = useState({})
  const [activeVideo, setActiveVideo] = useState(0)
   const { addItem } = useCart()
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Professional-grade cleaning solutions you can trust.',
    },
    {
      icon: Leaf,
      title: 'Eco Friendly',
      description: 'Safe for families, offices and the environment.',
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'Experienced and certified cleaning professionals.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick response and on-time service delivery.',
    },
  ]

const videoTestimonials = [
    { id: 1, title: "Customer Review 1", author: "Abdi Mohamed", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb1.jpg" },
    { id: 2, title: "Best Cleaning Service", author: "Fartuun Ali", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb2.jpg" },
    { id: 3, title: "Professional Team", author: "Hassan Nur", rating: 4, videoUrl: "https://youtu.be/pTFZFxd4hOI?si=rRYFEMiuSQJKdaHh", thumbnail: "/thumb3.jpg" },
    { id: 4, title: "Highly Recommended", author: "Zahra Ahmed", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb4.jpg" },
    { id: 5, title: "Top Quality Products", author: "Omar Dirie", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb5.jpg" },
    { id: 6, title: "Great Experience", author: "Muna Isse", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb6.jpg" },
    { id: 7, title: "Fast Delivery", author: "Khalid Muse", rating: 4, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb7.jpg" },
    { id: 8, title: "Reliable Support", author: "Idil Aden", rating: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/thumb8.jpg" },
  ]
  

    const handleAddToCart = (product) => {
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
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }
  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FBFBFA] pt-20">
  <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
    
    {/* Left Content */}
    <div className="text-left space-y-8">
      <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-primary text-xs font-black uppercase tracking-widest">
          #1 Trusted in Somalia
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-black/80 leading-[1.1] tracking-tight">
        Redefining <span className="text-primary">Clean</span> for <br /> 
        Modern Living
      </h1>

      <p className="text-lg md:text-xl text-black/60 max-w-xl leading-relaxed font-medium">
        Somalia’s leading experts in residential, commercial, and industrial hygiene. 
        Quality you can see, service you can trust.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button className="h-16 px-10 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
          Book a Service
        </Button>
        <Button variant="outline" className="h-16 px-10 border-black/10 text-black/80 rounded-2xl font-bold text-lg hover:bg-black/5 transition-all">
          Explore Services
        </Button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-8 pt-10 border-t border-black/5">
        <div>
          <p className="text-2xl font-black text-black/80">10k+</p>
          <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Done Projects</p>
        </div>
        <div>
          <p className="text-2xl font-black text-black/80">99%</p>
          <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Happy Clients</p>
        </div>
        <div>
          <p className="text-2xl font-black text-black/80">24/7</p>
          <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Support</p>
        </div>
      </div>
    </div>

    {/* Right Image/Design */}
    <div className="relative hidden lg:block">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
        <img 
          src="/DeganDhowr.jpg" 
          alt="Professional Cleaning" 
          className="w-full h-[600px] bg-cover object-center"
        />
      </div>
    </div>
  </div>
</section>
      

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition"
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

      {/* ================= PRODUCTS ================= */}
       <section className="py-16 max-w-7xl mx-auto lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Products
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our bestselling cleaning essentials, handpicked for exceptional performance.
            </p>
          </div>

      
  <div className="max-w-7xl mx-auto px-6">
    
          {/* Products Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
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
    
                      <div className="pt-2 flex items-center justify-between space-x-2">
                        <Link 
                          href={product.type === 'package' ? `/package_items/${product.id}` : `/product_item/${product.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold py-2 bg-gray-200/50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Info className="w-3 h-3" /> VIEW DETAILS
                        </Link>
                        {/* Quick Action Button - Floating */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={` bg-green-300 w-1/2 py-1.5 rounded-full flex items-center justify-center 
                           transition-all transform active:scale-95 ${
                          addedItems[product.id] ? 'bg-primary text-white' : ' hover:bg-green-500/60 text-gray-900-[#00C985] hover:text-white'
                        }`}
                      >
                        {addedItems[product.id] ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
  
  </div>


          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* ================= WHY US ================= */}
    <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00C985]/10 rounded-full blur-3xl" />
              <span className="text-[#00C985] font-black text-sm tracking-[0.2em] uppercase mb-4 block">
                Professional Excellence
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                Why we are the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C985] to-green-600">
                  Best in the Market
                </span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
                We combine professional-grade equipment with eco-friendly products to deliver an unmatched cleaning experience.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: 'Certified Experts', desc: 'Verified professionals' },
                  { icon: Clock, title: '24/7 Support', desc: 'Always here for you' },
                  { icon: Truck, title: 'Fast Delivery', desc: 'Prompt service response' },
                  { icon: ShieldCheck, title: 'Secure Payment', desc: '100% safe transactions' },
                ].map((item, i) => (
                  <div key={i} className="group p-4 rounded-2xl border border-gray-100 hover:border-[#00C985]/30 hover:bg-gray-50 transition-all duration-300">
                    <div className="w-10 h-10 bg-[#00C985] text-white rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-[#00C985]/20">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#00C985] rounded-3xl -z-10" />
              <img
                src="/products-showcase.jpg"
                alt="Cleaning Showcase"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                   <ThumbsUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Customer Satisfaction</p>
                  <p className="text-lg font-black text-gray-900">99.9%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MODERN VIDEO TESTIMONIALS ================= */}
      <section className="py-24 bg-gray-100 text-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#00C985] font-bold text-sm tracking-widest uppercase">Testimonials</span>
              <h2 className="text-4xl font-black mt-2">What our clients say</h2>
            </div>
            <p className="text-gray-400 max-w-xs text-sm">Real stories from people who trust Nadiif Cleaning services every day.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* BIG MAIN VIDEO PLAYER */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-black border border-white/10">
                <iframe
                  src={videoTestimonials[activeVideo].videoUrl}
                  className="w-full h-full"
                  title="Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-6 flex justify-between items-center bg-white/5 p-6 rounded-2xl">
                <div>
                  <h3 className="text-xl font-bold">{videoTestimonials[activeVideo].author}</h3>
                  <div className="flex gap-1 mt-1 text-[#00C985]">
                    {[...Array(videoTestimonials[activeVideo].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-gray-400 italic">"Excellent service and support!"</p>
                </div>
              </div>
            </div>

            {/* SCROLLABLE PLAYLIST (8 VIDEOS) */}
            <div className="lg:col-span-4 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {videoTestimonials.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(index)}
                  className={`w-full group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 border-2 ${
                    activeVideo === index 
                    ? 'bg-[#00C985]/10 border-[#00C985]' 
                    : 'bg-white/5 border-black/10 hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                    <div className={`absolute inset-0 border border-white/20 flex items-center justify-center z-10 ${activeVideo === index ? 'bg-[#00C985]/40' : 'bg-black/20 group-hover:bg-black/0'}`}>
                       <Play className={`w-6 h-6 ${activeVideo === index ? 'text-white' : 'text-white/70'}`} fill="currentColor" />
                    </div>
                    
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className={`text-xs font-black uppercase tracking-tighter ${activeVideo === index ? 'text-[#00C985]' : 'text-gray-500'}`}>
                      Video {index + 1}
                    </p>
                    <p className="text-sm font-bold truncate">{video.author}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-2 h-2 text-[#00C985] fill-current" />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Custom Scrollbar CSS */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C985; }
      `}</style>


     

    </main>
  )
}
