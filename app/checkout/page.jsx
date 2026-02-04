'use client'
import { useState, useEffect } from 'react'
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
  Home, CheckCircle2, ShieldCheck, Mail
} from 'lucide-react'

const BASE_URL = "http://127.0.0.1:8000"

const ShippingStep = ({ formData, setFormData, setCurrentStep }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
    <div className="flex items-center gap-3 mb-8">
      <MapPin className="text-[#00C985]" size={24} />
      <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
    </div>
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentStep('payment') }}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label className="flex items-center gap-2"><Mail size={14}/> Email Address</Label>
          <Input
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label className="flex items-center gap-2"><Home size={14}/> Street Address</Label>
          <Input
              placeholder="123 Main Street"
              required
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Region</Label>
          <Select onValueChange={(val) => setFormData({...formData, region: val})} defaultValue="Banaadir">
            <SelectTrigger><SelectValue placeholder="Banaadir" /></SelectTrigger>
            <SelectContent className="bg-white"><SelectItem value="Banaadir">Banaadir</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>District</Label>
          <Select onValueChange={(val) => setFormData({...formData, district: val})} defaultValue="Hodan">
            <SelectTrigger><SelectValue placeholder="Hodan" /></SelectTrigger>
            <SelectContent className="bg-white max-h-40 overflow-y-auto">
              {['Hodan', 'Wadajir', 'Yaaqshiid', 'Shibis', 'Daynile'].map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full h-12 text-white bg-[#00C985] hover:bg-[#00b377] rounded-xl text-lg font-bold transition-all">
        Continue to Payment <ArrowRight className="ml-2" size={18} />
      </Button>
    </form>
  </div>
);

const PaymentStep = ({ paymentMethod, setPaymentMethod, formData, setCurrentStep, clearCart, state, cartTotal, tax, total }) => {
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('customerInfo', JSON.stringify(formData));
    localStorage.setItem('orderedItems', JSON.stringify(state.items));
    localStorage.setItem('orderSummary', JSON.stringify({ cartTotal, tax, total }));
    clearCart();

    // setCurrentStep('confirmation');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-2 gap-4 mb-8">
        {/* DISABLED CREDIT CARD OPTION */}
        <div className="relative opacity-50 cursor-not-allowed grayscale pointer-events-none">
          <Label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-gray-400" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-400">Credit/Debit Card</span>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Temporarily Offline</span>
              </div>
            </div>
            <RadioGroupItem value="card" disabled={true} />
          </Label>
        </div>

        {/* ACTIVE MOBILE MONEY OPTION */}
        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <Smartphone size={20} className={paymentMethod === 'mobile' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold text-sm">Mobile Money (EVC/Sahal)</span>
          </div>
          <RadioGroupItem value="mobile" />
        </Label>
      </RadioGroup>

      <form onSubmit={handleFinalSubmit} className="space-y-6">
        {paymentMethod === 'mobile' && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <Label>Full Name (Account Name)</Label>
              <Input placeholder="e.g. Abdi Mohamed" required />
            </div>
            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <Input placeholder="+252 61 XXX XXXX" required />
            </div>
          </div>
        )}
        
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => setCurrentStep('shipping')} className="flex-1 h-12">
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>
          <Button type="submit" className="flex-[2] text-white h-12 bg-[#00C985] hover:bg-[#00b377] font-bold">
            Place Order <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </form>
    </div>
  )
};

const ConfirmationStep = ({ router }) => {
  const [lastOrder, setLastOrder] = useState({ items: [], summary: {}, info: {} });
  
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('customerInfo') || '{}');
    const items = JSON.parse(localStorage.getItem('orderedItems') || '[]');
    const summary = JSON.parse(localStorage.getItem('orderSummary') || '{}');
    setLastOrder({ items, summary, info });
  }, []);

  const orderId = `ORD-2026-00${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#00C985]/10 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} className="text-[#00C985]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 text-sm mb-10">Thank you for your purchase. We've received your order.</p>
            
            <div className="grid grid-cols-2 gap-4 pb-8 border-b border-gray-50 text-left">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Order Number</p>
                <p className="font-bold text-gray-900">#{orderId}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Status</p>
                <p className="font-bold text-[#00C985]">Processing</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FBFBFA] p-8 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Delivery Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-bold text-gray-900">Address:</span> {lastOrder.info.address}</p>
              <p><span className="font-bold text-gray-900">Location:</span> {lastOrder.info.district}, {lastOrder.info.region}</p>
              <p><span className="font-bold text-gray-900">Email:</span> {lastOrder.info.email}</p>
            </div>
          </div>

          <div className="p-8 flex flex-col sm:flex-row gap-4 border-t border-gray-50">
            <Button variant="outline" className="flex-1 h-12 font-bold" onClick={() => window.print()}>Print Receipt</Button>
            <Button onClick={() => { localStorage.clear(); router.push('/') }} className="flex-1 h-12 bg-[#00C985] hover:bg-[#00b377] text-white font-bold transition-all">Continue Shopping</Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6">Final Summary</h2>
          <div className="space-y-4 mb-6">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center p-2 border border-gray-50">
                   <img src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} className="w-full h-full object-contain" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate uppercase">{item.title || item.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t pt-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900">${lastOrder.summary.cartTotal?.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (1%)</span><span className="text-gray-900">${lastOrder.summary.tax?.toFixed(2)}</span></div>
            <div className="flex justify-between text-base font-black border-t pt-3 text-gray-900 normal-case tracking-normal">
              <span>Total Paid</span><span className="text-[#00C985]">${lastOrder.summary.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { state, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('shipping')
  const [paymentMethod, setPaymentMethod] = useState('mobile')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    region: 'Banaadir',
    district: 'Hodan'
  });

  const tax = cartTotal * 0.01
  const total = cartTotal + tax

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {currentStep !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-primary' : 'text-gray-400'}`}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-[#00C985] text-white"><MapPin size={18} /></div>
              <span className="hidden sm:inline font-bold">Shipping</span>
            </div>
            <div className={`w-16 h-[2px] ${currentStep === 'payment' ? 'bg-[#00C985]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'payment' ? 'bg-[#00C985] text-white' : 'bg-gray-100 text-gray-400'}`}><CreditCard size={18} /></div>
              <span className="hidden sm:inline font-bold">Payment</span>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' ? (
          <ConfirmationStep router={router} />
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {currentStep === 'shipping' ? (
                <ShippingStep formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />
              ) : (
                <PaymentStep 
                  paymentMethod={paymentMethod} 
                  setPaymentMethod={setPaymentMethod} 
                  formData={formData} 
                  setCurrentStep={setCurrentStep}
                  clearCart={clearCart}
                  state={state}
                  cartTotal={cartTotal}
                  tax={tax}
                  total={total}
                />
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 p-1">
                        <img src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate uppercase">{item.title || item.name}</p>
                        <p className="text-xs text-gray-500 font-medium tracking-tighter">QTY: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t pt-4 text-sm font-medium">
                  <div className="flex justify-between text-gray-500 text-xs uppercase font-bold tracking-widest"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500 text-xs uppercase font-bold tracking-widest"><span>Tax (1%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-lg font-extrabold border-t pt-3 text-gray-900">
                    <span>Total</span><span className="text-[#00C985]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-gray-50 rounded-xl flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
                  <ShieldCheck size={16} /> Secured by Degaan Payment
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