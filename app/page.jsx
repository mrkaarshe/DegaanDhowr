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
    { id: 1, title: "Yerdameli Hospital Aragtidoda", author: "Ibrahim Maxamed Hassan ", rating: 5, videoUrl: "https://youtu.be/YzD-sehSj8s?si=cdOfoSunrABmkZ0C", thumbnail: "/thumb1.jpg" },
    { id: 2, title: "Xooga Hospital Aragtidoda", author: "", rating: 5, videoUrl: "https://youtu.be/gnuvOif7UGc?si=IiwygPYpBrWnfZ47", thumbnail: "/thumb2.jpg" },
    { id: 3, title: "Siu university Aragtidoda", author: "Nur Ali Abdullahi Afogoye", rating: 4, videoUrl: "https://youtu.be/Wct64lZ7WIE?si=LRr9UvmXaZeuhB3_", thumbnail: "/thumb3.jpg" },
    { id: 4, title: "Ladan Hospital Aragtidoda", author: "Dr:Apdullahi Ahmed Abtidoon ", rating: 5, videoUrl: "https://youtu.be/cu2n2WCOnBQ?si=VyIeUgcmbfWzSDgC", thumbnail: "/thumb4.jpg" },
    { id: 5, title: "Qeebta guryaha", author: "Maryan Siciid Mohamed", rating: 3, videoUrl: "https://youtu.be/0y7QBEZuepg?si=lqZSe7XTg3QxQpnM", thumbnail: "/thumb5.jpg" },
    { id: 6, title: "Aragtida Gudomiyaha Jamacada Al arabia", author: "Mohamed Ibrahim Ali Mansur ", rating: 5, videoUrl: "https://youtu.be/ks_nl9IuOuY?si=5jiVp5aR3aAJS553", thumbnail: "/thumb6.jpg" },
    { id: 7, title: "ummah Hospital Aragtidoda", author: "Ahmed Mohamed Hassan", rating: 4, videoUrl: "https://youtu.be/Ka3AZ-Ra9So?si=N4F__C-v6Yq7aFiR", thumbnail: "/thumb7.jpg" }
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
    <main className="bg-white text-gray-900 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[60vh] flex items-center bg-[#FBFBFA] pt-15">
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
        <Button className="h-16 px-10 bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
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
    <div className="relative ">
      <div className='absolute -top-8 bg-green-400/70 mt-3 md:mt-0 rounded-3xl w-full h-96 md:h-140 -rotate-3'></div>
      <div className="absolute -top-20 -right-20 w-86 h-86 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
        <img 
          src="/DeganDhowr.jpg" 
          alt="Professional Cleaning" 
          className="w-full max-h-[500px] bg-cover object-center"
        />
      </div>
    </div>
  </div>
</section>
      

      {/* ================= FEATURES ================= */}
      <section className="pt-30 md:py-20 pb-10 bg-muted/40">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
       <section className="py-16  bg-gray-50 lg:py-24">
        <div className="container mx-auto px-">
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

      
  <div className=" px-6">
    
          {/* Products Grid */}
          <section className="py-12">
            <div className="container mx-auto px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0,4).map((product) => (
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
                          className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold py-3 bg-gray-200/90 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Info className="w-3 h-3" /> VIEW DETAILS
                        </Link>
                        {/* Quick Action Button - Floating */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={` bg-green-300 w-1/2 py-3 rounded-full flex items-center justify-center 
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
        <div className="container mx-auto px-6">
         <div className='pb-20'>
           <h1 className="text-center text-5xl font-bold text-gray-900 mb-3">Why <span className='text-primary'>Choose Our</span> Services</h1>
          <p className='text-center text-gray-500 max-w-2xl mx-auto'>Discover what makes our cleaning services stand out from the competition.</p>
         </div>
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
                  <div key={i} className="group p-4 rounded-2xl border border-gray-300 hover:border-[#00C985]/90 hover:bg-gray-50 transition-all duration-300">
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
                src="/whayChooseUS.jpg"
                alt="Cleaning Showcase"
                className="rounded-3xl w-full min-h-[300px] md:h-[600px] object-center"
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

     {/* testmonilsm */}
  {/* ================= TESTIMONIALS (VIDEO PLAYER) ================= */}
<section className="py-24 bg-gray-50">
  <div className="mb-12 px-6">
    <div className="flex flex-col items-center text-center space-y-4">
      <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-[0.2em]">
        Verified Reviews
      </span>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900">
        Customer <span className="text-primary">Testimonials</span>
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-lg">
        Daawo muuqaalada macaamiisheena iyo sida ay ugu qanceen adeegyada CleanServe.
      </p>
    </div>
  </div>

  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      
      {/* --- MAIN PLAYER --- */}
      <div className="lg:col-span-8 group">
        <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-black border-4 border-white">
          <iframe
            key={activeVideo} // Ensures iframe reloads when source changes
            src={`https://www.youtube.com/embed/${videoTestimonials[activeVideo].videoUrl.split('si=')[0].split('/').pop()?.split('?')[0]}`}
            className="w-full h-full"
            title="Testimonial Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info Card under Video */}
        <div className="mt-8 bg-white p-8 rounded-[24px] border border-black/5 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-primary/30">
              {videoTestimonials[activeVideo].author.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-black text-gray-900 leading-tight">
                {videoTestimonials[activeVideo].author || "Our Valued Client"}
              </h3>
              <div className="flex flex-col items-start gap-2 mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < videoTestimonials[activeVideo].rating ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-400 ">Verified Purchase</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-green-50 rounded-full flex items-center gap-2 border border-green-100">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-700 uppercase">Trusted Review</span>
             </div>
          </div>
        </div>
      </div>

      {/* --- PLAYLIST SIDEBAR --- */}
      <div className="lg:col-span-4 flex flex-col gap-4 max-h-[700px]">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            More Reviews ({videoTestimonials.length})
          </p>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar pb-10">
          {videoTestimonials.map((video, index) => {
             // Extract Video ID for Thumbnail
             const videoId = video.videoUrl.split('si=')[0].split('/').pop()?.split('?')[0];
             const isActive = activeVideo === index;

             return (
              <button
                key={video.id}
                onClick={() => {
                  setActiveVideo(index);
                  
                }}
                className={`w-full group relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-500 border-2 ${
                  isActive 
                  ? 'bg-white border-primary shadow-[0_10px_30px_rgba(0,201,133,0.15)] scale-[1.03] z-10' 
                  : 'bg-white/50 border-transparent hover:border-gray-300 hover:bg-white'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-md">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                    alt={video.author}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                    isActive ? 'bg-primary/40' : 'bg-black/20 group-hover:bg-black/40'
                  }`}>
                    <div className={`p-2 rounded-full transition-all ${
                      isActive ? 'bg-white text-primary scale-110 shadow-lg' : 'bg-white/50 text-white group-hover:scale-110'
                    }`}>
                      <Play className="w-4 h-4" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Text Info */}
                <div className="text-left overflow-hidden">
                  <span className={`text-[10px] font-black uppercase tracking-tighter block mb-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {isActive ? 'Currently Watching' : `Client Story 0${index + 1}`}
                  </span>
                  <p className="text-sm font-black text-gray-900 leading-tight line-clamp-2">
                    {video.title}
                  </p>
                  <p className="text-[11px] text-gray-500 font-bold mt-1 truncate">
                    {video.author || "Anonymous"}
                  </p>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-primary rounded-full" />
                )}
              </button>
             );
          })}
        </div>
      </div>

    </div>
  </div>

  <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C985; }
  `}</style>
</section>

     

    </main>
  )
}
