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
  User, Mail, Phone, Home, Building, CheckCircle2, Printer, ShieldCheck
} from 'lucide-react'

const BASE_URL = "http://192.168.8.11:8000"

const ShippingStep = ({ formData, setFormData, setCurrentStep }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
    <div className="flex items-center gap-3 mb-8">
      <MapPin className="text-[#00C985]" size={24} />
      <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
    </div>
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentStep('payment') }}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><User size={14}/> First Name</Label>
          <Input
            placeholder="John"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><User size={14}/> Last Name</Label>
          <Input
            placeholder="Doe"
            required
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
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
      <Button type="submit" className="w-full h-12 text-white bg-[#00C985] hover:bg-[#00b377] rounded-xl text-lg font-bold transition-all">
        Continue to Payment <ArrowRight className="ml-2" size={18} />
      </Button>
    </form>
  </div>
);

const PaymentStep = ({ paymentMethod, setPaymentMethod, formData, setFormData, setCurrentStep, clearCart, state, cartTotal, tax, total }) => {
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('customerInfo', JSON.stringify(formData));
    localStorage.setItem('orderedItems', JSON.stringify(state.items));
    localStorage.setItem('orderSummary', JSON.stringify({ cartTotal, tax, total }));
    clearCart();
    setCurrentStep('confirmation');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-2 gap-4 mb-8">
        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold text-sm">Credit/Debit Card</span>
          </div>
          <RadioGroupItem value="card" />
        </Label>
        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <Smartphone size={20} className={paymentMethod === 'mobile' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold text-sm">Mobile Money</span>
          </div>
          <RadioGroupItem value="mobile" />
        </Label>
      </RadioGroup>

      <form onSubmit={handleFinalSubmit} className="space-y-6">
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
          <Button type="submit" className="flex-[2] text-white h-12 bg-[#00C985] hover:bg-[#00b377] font-bold">
            Review Order <ArrowRight className="ml-2" size={18} />
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
  const today = "January 31, 2026";

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
            <p className="text-gray-500 text-sm mb-10">Thank you for your purchase. Your order has been received.</p>
            
            <div className="grid grid-cols-2 gap-4 pb-8 border-b border-gray-50 text-left">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Order Number</p>
                <p className="font-bold text-gray-900">#{orderId}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Order Date</p>
                <p className="font-bold text-gray-900">{today}</p>
              </div>
            </div>

            <div className="py-5 space-y-0 max-w-sm mx-auto">
              <div className="flex gap-4 relative pb-10">
                <div className="absolute left-3 top-6 w-[2px] h-full bg-gray-100"></div>
                <div className="w-6 h-6 rounded-full bg-[#00C985] flex items-center justify-center z-10"><CheckCircle2 size={12} className="text-white" /></div>
                <div className="text-left"><p className="font-bold text-sm text-gray-900">Order Placed</p><p className="text-[11px] text-gray-400">Your order has been confirmed</p></div>
              </div>
              <div className="flex gap-4 relative pb-10">
                 <div className="absolute left-3 top-6 w-[2px] h-full bg-gray-100"></div>
                 <div className="w-6 h-6 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center z-10 ring-1 ring-gray-200"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div></div>
                 <div className="text-left"><p className="font-bold text-sm text-gray-400">Processing</p><p className="text-[11px] text-gray-400">We're preparing your order</p></div>
              </div>
              <div className="flex gap-4 relative pb-10">
                
                 <div className="w-6 h-6 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center z-10 ring-1 ring-gray-200"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div></div>
                 <div className="text-left"><p className="font-bold text-sm text-gray-400">Shipped</p><p className="text-[11px] text-gray-400">On its way to your address</p></div>
              </div>

            </div>
          </div>

          <div className="bg-[#FBFBFA] p-8 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Shipping Address</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">Name: {lastOrder.info.firstName} {lastOrder.info.lastName}</p>
              <p>Adress:{lastOrder.info.address}</p>
              <p>Region: {lastOrder.info.region}</p>
              <p>District: {lastOrder.info.district}</p>
              <p>Email: {lastOrder.info.email}</p>
              <p>Somalia</p>
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
          <h2 className="text-lg font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img const BASE_URL = "http://192.168.8.11:8000" className="w-12 h-12 rounded-lg object-cover bg-gray-50" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{item.title || item.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t pt-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900">${lastOrder.summary.cartTotal?.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-[#00C985]">Free</span></div>
            <div className="flex justify-between"><span>Tax (0.1%)</span><span className="text-gray-900">${lastOrder.summary.tax?.toFixed(2)}</span></div>
            <div className="flex justify-between text-base font-black border-t pt-3 text-gray-900 normal-case tracking-normal">
              <span>Total</span><span className="text-[#00C985]">${lastOrder.summary.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

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
            <div className="w-16 h-[2px] bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold"><CheckCircle2 size={18} /></div>
              <span className="hidden sm:inline font-bold">Confirmation</span>
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
                  setFormData={setFormData} 
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
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <img src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{item.title || item.name}</p>
                        <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t pt-4 text-sm font-medium">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[#00C985]"><span>Shipping</span><span>Free</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax (0.1%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-lg font-extrabold border-t pt-3 text-gray-900">
                    <span>Total</span><span className="text-[#00C985]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-gray-50 rounded-lg flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-black">
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