'use client'
import { useCart } from '@/context/cart-context'
import { ShieldCheck, MapPin, CreditCard } from 'lucide-react'
import { usePathname } from 'next/navigation'

const BASE_URL = "http://192.168.8.11:8000/"

export default function CheckoutLayout({ children }) {
  const { state, cartTotal } = useCart()
  const pathname = usePathname()

  const isConfirmation = pathname.includes('confirmation')
  
  const tax = cartTotal * 0.01
  const total = cartTotal + tax

  if (isConfirmation) return <>{children}</>

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* --- STEP PROGRESS BAR --- */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className={`flex items-center gap-2 ${pathname.includes('shipping') ? 'text-[#00C985]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${pathname.includes('shipping') ? 'bg-[#00C985] text-white' : 'bg-gray-100'}`}>
              <MapPin size={18} />
            </div>
            <span className="hidden sm:inline font-bold">Shipping</span>
          </div>
          <div className={`w-16 h-[2px] ${pathname.includes('payment') ? 'bg-[#00C985]' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-2 ${pathname.includes('payment') ? 'text-[#00C985]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${pathname.includes('payment') ? 'bg-[#00C985] text-white' : 'bg-gray-100'}`}>
              <CreditCard size={18} />
            </div>
            <span className="hidden sm:inline font-bold">Payment</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center  gap-8">
          {/* --- DYNAMIC PAGES (Shipping or Payment) --- */}
          <div className="min-h-[450px] lg:col-span-2 w-1/1 md:w-3/4 lg:w-full mx-auto">
            {children}
          </div>
          
          {/* --- STICKY ORDER SUMMARY --- */}
          <div className="lg:col-span-4  items-center -mt-0 md:mt-10 ">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full lg:w-96 sticky top-34">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border p-1 shrink-0">
                      <img 
                        src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} 
                        alt="" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate uppercase">{item.title || item.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900">${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (1%)</span><span className="text-gray-900">${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-black border-t pt-3 text-gray-900 normal-case tracking-normal">
                  <span>Total</span><span className="text-[#00C985]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-xl flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                <ShieldCheck size={16} /> Secured by Degaan Payment
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}