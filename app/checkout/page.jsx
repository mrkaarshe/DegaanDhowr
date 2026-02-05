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
  Home, CheckCircle2, ShieldCheck, Mail, Loader2, AlertCircle
} from 'lucide-react'

const BASE_URL = "http://192.168.8.11:8000/"
// Note: Ensure this URL matches your local proxy or actual server IP
const ORDER_API_URL = 'http://127.0.0.1:8000/api/method/degaan_shop.degaan_shop.api.order.create_order_and_pay'

// --- SHIPPING STEP ---
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
          <Select onValueChange={(val) => setFormData({...formData, region: val})} defaultValue="Banadir">
            <SelectTrigger><SelectValue placeholder="Banadir" /></SelectTrigger>
            <SelectContent className="bg-white"><SelectItem value="Banadir">Banadir</SelectItem></SelectContent>
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

// --- PAYMENT STEP WITH LOADING & API CHECK ---
const PaymentStep = ({ paymentMethod, setPaymentMethod, formData, setFormData, setCurrentStep, clearCart, state, total }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

 const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      order: {
        customer_full_name: formData.fullName,
        customer_phone: formData.phone,
        region: formData.region,
        district: formData.district,
        address: formData.address,
        items: state.items.map(i => ({
          item_code: i.sku || i.id,
          qty: i.quantity,
          price: i.price,
        })),
        total: total,
        notes: 'Order from Web Checkout',
      },
    };

    try {
      const res = await fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const apiResponse = data.message;

      // Hubi haddii status-ku yahay false (Sida Response-ka aad soo dirtay)
      if (apiResponse && apiResponse.status === false) {
        // Halkan waxaan ka soo qaadanaynaa farriinta rasmiga ah ee SERVER-ka
        // Waxay soo bandhigi doontaa: "Payment Failed (Haraaga xisaabtaadu kuguma filna...)"
        const serverErrorMessage = apiResponse.message || apiResponse.payment?.responseMsg || "Payment could not be completed.";
        
        throw new Error(serverErrorMessage);
      }

      // Haddii status-ku yahay true (Guul)
      if (apiResponse && apiResponse.status === true) {
        localStorage.setItem('customerInfo', JSON.stringify(formData));
        localStorage.setItem('orderedItems', JSON.stringify(state.items));
        localStorage.setItem('salesOrder', apiResponse.sales_order);
        
        clearCart();
        setCurrentStep('confirmation');
      } else {
        throw new Error("Unexpected response from server.");
      }

    } catch (err) {
      console.error("Payment Error:", err);
      // Halkan ayay farriintu ku soo baxaysaa UI-ga (Red Box-ka)
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
      {/* FULL SCREEN LOADING OVERLAY */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6">
          <div className="relative mb-6">
            <Loader2 className="w-16 h-16 text-[#00C985] animate-spin" />
            <Smartphone className="absolute inset-0 m-auto text-[#00C985]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Awaiting Payment...</h3>
          <p className="text-gray-500 max-w-xs">Please check your phone <b>{formData.phone}</b> and enter your PIN to complete the order.</p>
          <div className="mt-8 flex gap-2">
             <div className="w-2 h-2 bg-[#00C985] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             <div className="w-2 h-2 bg-[#00C985] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
             <div className="w-2 h-2 bg-[#00C985] rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="relative opacity-50 cursor-not-allowed grayscale pointer-events-none">
          <Label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-gray-400" />
              <span className="font-semibold text-sm text-gray-400">Card</span>
            </div>
            <RadioGroupItem value="card" disabled />
          </Label>
        </div>

        <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <Smartphone size={20} className={paymentMethod === 'mobile' ? 'text-[#00C985]' : 'text-gray-400'} />
            <span className="font-semibold text-sm">Mobile Money (EVC/Sahal)</span>
          </div>
          <RadioGroupItem value="mobile" />
        </Label>
      </RadioGroup>

      <form onSubmit={handleFinalSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name (Account Name)</Label>
            <Input 
              placeholder="e.g. Abdi Mohamed" 
              required 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Mobile Number</Label>
            <Input 
              placeholder="+252 61 XXX XXXX" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => setCurrentStep('shipping')} className="flex-1 h-12">
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-[2] text-white h-12 bg-[#00C985] hover:bg-[#00b377] font-bold">
            {isSubmitting ? 'Processing...' : `Pay Now $${total.toFixed(2)}`}
          </Button>
        </div>
      </form>
    </div>
  )
};

// --- CONFIRMATION STEP ---
const ConfirmationStep = ({ router }) => {
  const [lastOrder, setLastOrder] = useState({ items: [], info: {}, salesOrder: '' });
  
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('customerInfo') || '{}');
    const items = JSON.parse(localStorage.getItem('orderedItems') || '[]');
    const salesOrder = localStorage.getItem('salesOrder') || '';
    setLastOrder({ items, info, salesOrder });
  }, []);

  const total = lastOrder.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500 text-center">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-[#00C985]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 size={48} className="text-[#00C985]" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-500 text-lg mb-8">Your payment was successful. Your order is now being processed.</p>
          
          <div className="inline-block px-6 py-2 bg-gray-50 rounded-full text-sm font-bold text-gray-500 mb-10">
            Order ID: <span className="text-[#00C985]">#{lastOrder.salesOrder}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left border-t border-gray-100 pt-10">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Delivery To</h3>
              <p className="font-bold text-gray-800">{lastOrder.info.fullName}</p>
              <p className="text-sm text-gray-500">{lastOrder.info.address}, {lastOrder.info.district}</p>
              <p className="text-sm text-gray-500">{lastOrder.info.phone}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Payment Info</h3>
              <p className="font-bold text-gray-800">Mobile Money (Paid)</p>
              <p className="text-2xl font-black text-[#00C985] mt-2">${(total + (total * 0.01)).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex gap-4">
          <Button onClick={() => { localStorage.clear(); router.push('/') }} className="w-full h-14 bg-[#00C985] hover:bg-[#00b377] text-white text-lg font-bold rounded-2xl shadow-lg shadow-[#00C985]/20">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CHECKOUT PAGE ---
const CheckoutPage = () => {
  const { state, cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('shipping')
  const [paymentMethod, setPaymentMethod] = useState('mobile')
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    region: 'Banadir',
    district: 'Hodan'
  });

  const tax = cartTotal * 0.01
  const total = cartTotal + tax

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {currentStep !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-[#00C985]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'shipping' ? 'bg-[#00C985] text-white' : 'bg-gray-100'}`}><MapPin size={18} /></div>
              <span className="hidden sm:inline font-bold">Shipping</span>
            </div>
            <div className={`w-16 h-[2px] ${currentStep === 'payment' ? 'bg-[#00C985]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-[#00C985]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'payment' ? 'bg-[#00C985] text-white' : 'bg-gray-100'}`}><CreditCard size={18} /></div>
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
                  setFormData={setFormData}
                  setCurrentStep={setCurrentStep}
                  clearCart={clearCart}
                  state={state}
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
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border p-1 shrink-0">
                        <img src={item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} alt="" className="w-full h-full object-contain" />
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
        )}
      </div>
    </div>
  )
}

export default CheckoutPage