'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, Smartphone, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'

const ORDER_API_URL = 'http://127.0.0.1:8000/api/method/degaan_shop.degaan_shop.api.order.create_order_and_pay'

export default function PaymentPage() {
  const router = useRouter()
  const { state, cartTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('mobile')
  
  const [paymentData, setPaymentData] = useState({ fullName: '', phone: '' })
  const [shippingData, setShippingData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('checkout_info')
    if (!saved) router.push('/Checkaut/shipping')
    setShippingData(JSON.parse(saved))
  }, [router])

  const total = cartTotal + (cartTotal * 0.01)

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const payload = {
      order: {
        ...shippingData,
        customer_full_name: paymentData.fullName,
        customer_phone: paymentData.phone,
        items: state.items.map(i => ({
          item_code: i.sku || i.id,
          qty: i.quantity,
          price: i.price,
        })),
        total: total,
      },
    }

    try {
      const res = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      const apiResponse = data.message

      if (apiResponse?.status === false) {
        throw new Error(apiResponse.message || "Payment Failed")
      }

      if (apiResponse?.status === true) {
        localStorage.setItem('salesOrder', apiResponse.sales_order)
        localStorage.setItem('orderedItems', JSON.stringify(state.items))
        clearCart()
        router.push('/Checkaut/confirmation')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-100 shadow-sm mt-10 relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#00C985] animate-spin mb-4" />
          <p className="font-bold">Awaiting Payment PIN...</p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Payment</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex gap-3">
          <AlertCircle size={18} /> <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <form onSubmit={handleFinalSubmit} className="space-y-6">
         <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
            <Label className={`p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
               <div className="flex items-center gap-3">
                 <Smartphone size={20} />
                 <span>Mobile Money</span>
               </div>
               <RadioGroupItem value="mobile" className="hidden" />
            </Label>
            <Label className={`p-4 border-2 rounded-xl cursor-pointer ${paymentMethod === 'card' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
                <div className="text-gray-400 flex items-center gap-3">
                    <CreditCard size={20} />
                    <span>Card <br /> Payment</span>
                 
                </div>
    
               <RadioGroupItem disabled value="card" className="hidden" />
            </Label>
         </RadioGroup>

        <div className="space-y-4">
          <Input placeholder="Full Name" required value={paymentData.fullName} onChange={(e) => setPaymentData({...paymentData, fullName: e.target.value})} />
          <Input placeholder="Mobile Number (e.g. 61xxxxxxx)" required value={paymentData.phone} onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})} />
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">Back</Button>
          <Button type="submit" className="flex-[2] bg-[#00C985] text-white">Pay Now ${total.toFixed(2)}</Button>
        </div>
      </form>
    </div>
  )
}