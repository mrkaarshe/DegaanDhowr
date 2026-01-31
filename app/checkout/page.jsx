'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { 
  ArrowLeft, ArrowRight, CreditCard, Smartphone, MapPin, 
  User, Mail, Phone, Home, Building, CheckCircle2, Printer, ShoppingBag, ShieldCheck
} from 'lucide-react'

const CheckoutPage = () => {
  const { state, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('shipping')
  const [paymentMethod, setPaymentMethod] = useState('mobile')

  // Xisaabinta qiimaha (Calculation)
  const tax = cartTotal * 0.08
  const total = cartTotal + tax

  // 1. Shipping Step
  const ShippingStep = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
      </div>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentStep('payment') }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><User size={14}/> First Name</Label>
            <Input placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><User size={14}/> Last Name</Label>
            <Input placeholder="Doe" required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label className="flex items-center gap-2"><Mail size={14}/> Email Address</Label>
            <Input type="email" placeholder="john@example.com" required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label className="flex items-center gap-2"><Home size={14}/> Street Address</Label>
            <Input placeholder="123 Main Street" required />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Building size={14}/> Region</Label>
            <Select required>
              <SelectTrigger><SelectValue placeholder="Banaadir" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="banaadir">Banaadir</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Building size={14}/> District</Label>
            <Select required>
              <SelectTrigger><SelectValue placeholder="Hodan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hodan">Hodan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full h-12 bg-[#00C985] hover:bg-[#00b377] rounded-xl text-lg">
          Continue to Payment <ArrowRight className="ml-2" size={18} />
        </Button>
      </form>
    </div>
  )

  // 2. Payment Step (Halkan waxaa ku jira Mobile Money & Credit Card inputs)
  const PaymentStep = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-2 gap-4 mb-8">
        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold">Credit/Debit Card</span>
          </div>
          <RadioGroupItem value="card" />
        </Label>
        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <Smartphone size={20} className={paymentMethod === 'mobile' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold">Mobile Money</span>
          </div>
          <RadioGroupItem value="mobile" />
        </Label>
      </RadioGroup>

      <form onSubmit={(e) => { e.preventDefault(); setCurrentStep('confirmation') }} className="space-y-6">
        {paymentMethod === 'mobile' ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label>Full Name (Account Name)</Label>
              <Input placeholder="e.g. John Doe" required />
            </div>
            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <Input placeholder="+252 61 XXX XXXX" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Region</Label>
                <Input placeholder="Banaadir" required />
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Input placeholder="Hodan" required />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" required />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input placeholder="123" required />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => setCurrentStep('shipping')} className="flex-1 h-12">
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>
          <Button type="submit" className="flex-[2] h-12 bg-[#00C985] hover:bg-[#00b377]">
            Review Order <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </form>
    </div>
  )

  // 3. Order Confirmed Step (Design-ka sawirka 4aad)
  const ConfirmationStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[#00C985]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 size={48} className="text-[#00C985]" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500 mt-2">Thank you for your purchase. Your order has been received.</p>
        </div>
        
        <div className="flex justify-between p-4 bg-gray-50 rounded-xl text-left">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Order Number</p>
            <p className="font-bold text-gray-900">#ORD-2026-001942</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Order Date</p>
            <p className="font-bold text-gray-900">January 31, 2026</p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="space-y-6 text-left py-4">
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-[#00C985] flex items-center justify-center z-10">
              <CheckCircle2 size={14} className="text-white" />
            </div>
            <div className="absolute left-3 top-6 w-[2px] h-12 bg-gray-100"></div>
            <div>
              <p className="font-bold text-sm">Order Placed</p>
              <p className="text-xs text-gray-500">Your order has been confirmed</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-400">Processing</p>
              <p className="text-xs text-gray-400">We're preparing your order</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button variant="outline" className="flex-1 h-12 border-gray-200">
            <Printer className="mr-2" size={18} /> Print Receipt
          </Button>
          <Button onClick={() => { clearCart(); router.push('/') }} className="flex-1 h-12 bg-[#00C985] hover:bg-[#00b377]">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Steps Header */}
        {currentStep !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'shipping' ? 'bg-[#00C985] text-white' : 'bg-[#00C985] text-white'}`}>
                <MapPin size={18} />
              </div>
              <span className="hidden sm:inline font-bold">Shipping</span>
            </div>
            <div className={`w-16 h-[2px] ${currentStep === 'payment' ? 'bg-[#00C985]' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'payment' ? 'bg-[#00C985] text-white' : 'bg-gray-100 text-gray-400'}`}>
                <CreditCard size={18} />
              </div>
              <span className={`hidden sm:inline font-bold ${currentStep === 'payment' ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
            </div>
            <div className="w-16 h-[2px] bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">
                <CheckCircle2 size={18} />
              </div>
              <span className="hidden sm:inline font-bold text-gray-400">Confirmation</span>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' ? (
          <ConfirmationStep />
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {currentStep === 'shipping' ? <ShippingStep /> : <PaymentStep />}
            </div>

            {/* Sidebar Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t pt-4 text-sm font-medium">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[#00C985]"><span>Shipping</span><span>Free</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-lg font-extrabold border-t pt-3">
                    <span>Total</span><span className="text-[#00C985]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <ShieldCheck size={16} /> Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage