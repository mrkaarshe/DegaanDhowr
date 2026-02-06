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
import { CreditCard, Smartphone, Loader2, AlertCircle, ShieldCheck } from 'lucide-react'
import { createOrderAndPay } from '@/lib/api/services/orders'
import { ASSET_BASE_URL } from '@/lib/api/config'

export default function PaymentPage() {
  const router = useRouter()
  const { state, cartTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('mobile')

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    district: 'Hodan',
    region: 'Banadir',
  })

  const tax = cartTotal * 0.01
  const total = cartTotal + tax

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Expand packages into items-only for API
    const expandedItems = []
    state.items.forEach(cartItem => {
      if (cartItem.type === 'package' && cartItem.items && Array.isArray(cartItem.items)) {
        // Expand package: multiply sub-item quantities by package quantity
        const packageQty = cartItem.quantity || 1
        cartItem.items.forEach(subItem => {
          const subItemCode = subItem.code || subItem.item_code || subItem.name
          const subItemQty = (subItem.quantity || 1) * packageQty

          // Check if this item already exists in expanded list
          const existingIndex = expandedItems.findIndex(
            item => item.item_code === subItemCode
          )

          if (existingIndex >= 0) {
            // Add to existing quantity
            expandedItems[existingIndex].qty += subItemQty
          } else {
            // Add new item
            expandedItems.push({
              item_code: subItemCode,
              qty: subItemQty,
              price: subItem.price || cartItem.price || 0,
            })
          }
        })
      } else if (cartItem.type === 'item') {
        // Regular item - add directly
        const itemCode = cartItem.code || cartItem.sku || cartItem.id
        const existingIndex = expandedItems.findIndex(
          item => item.item_code === itemCode
        )

        if (existingIndex >= 0) {
          expandedItems[existingIndex].qty += (cartItem.quantity || 1)
        } else {
          expandedItems.push({
            item_code: itemCode,
            qty: cartItem.quantity || 1,
            price: cartItem.price || 0,
          })
        }
      }
    })

    const payload = {
      order: {
        customer_full_name: formData.fullName,
        customer_phone: formData.phone,
        region: formData.region,
        district: formData.district,
        items: expandedItems, // Only items, packages expanded
        total: total,
        notes: 'Order from Web Checkout',
      },
    }
    console.log(payload)

    try {
      const result = await createOrderAndPay(payload)

      if (!result.ok) {
        // Check for Frappe error response
        if (result.raw?.message?.status === false) {
          const serverMessage = result.raw.message.message || result.raw.message.payment?.responseMsg || result.error || "Payment could not be completed."
          throw new Error(serverMessage)
        }
        throw new Error(result.error || "Payment could not be completed.")
      }

      // Check response status
      if (result.raw?.message?.status === false) {
        const serverMessage = result.raw.message.message || result.raw.message.payment?.responseMsg || "Payment could not be completed."
        throw new Error(serverMessage)
      }

      // Success
      if (result.raw?.message?.status === true || result.data) {
        // Store order info if needed
        if (result.raw?.message?.sales_order) {
          localStorage.setItem('salesOrder', result.raw.message.sales_order)
        }
        localStorage.setItem('customerInfo', JSON.stringify(formData))
        localStorage.setItem('orderedItems', JSON.stringify(state.items))

        clearCart()

        // Navigate to success/confirmation
        router.push('/shop/checkout/confirmation')
      } else {
        throw new Error("Unexpected response from server.")
      }
    } catch (err) {
      console.error("Payment Error:", err)
      setError(err?.message || "Payment failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 font-medium mb-4">Your cart is empty</p>
          <Button onClick={() => router.push('/shop/products')} className="bg-[#00C985] text-white">
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
              {/* Loading Overlay */}
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
                <h2 className="text-xl font-bold text-gray-800">Payment & Shipping</h2>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-2 gap-4">
                    <Label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-[#00C985] bg-[#00C985]/5' : 'border-gray-100'
                      }`}>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} className={paymentMethod === 'mobile' ? 'text-[#00C985]' : 'text-gray-400'} />
                          <span className="font-semibold text-sm">Mobile Money</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-8">EVC, SAHAL, JEEP, WAAFI</p>
                      </div>
                      <RadioGroupItem value="mobile" />
                    </Label>

                    <div className="relative opacity-50 cursor-not-allowed grayscale pointer-events-none">
                      <Label className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CreditCard size={20} className="text-gray-400" />
                          <span className="font-semibold text-sm text-gray-400">Card Payment</span>
                        </div>
                        <RadioGroupItem value="card" disabled />
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Customer Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="e.g. Abdi Mohamed"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="+252 61 XXX XXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      onValueChange={(val) => setFormData({ ...formData, region: val })}
                      defaultValue="Banadir"
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full"><SelectValue placeholder="Banadir" /></SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Banadir">Banadir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>District</Label>
                    <Select
                      onValueChange={(val) => setFormData({ ...formData, district: val })}
                      defaultValue="Hodan"
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full"><SelectValue placeholder="Hodan" /></SelectTrigger>
                      <SelectContent className="bg-white max-h-40 overflow-y-auto">
                        {['Hodan', 'Wadajir', 'Yaaqshiid', 'Shibis', 'Daynile'].map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-white bg-[#00C985] hover:bg-[#00b377] font-bold text-lg"
                >
                  {isSubmitting ? 'Processing...' : `Pay Now $${total.toFixed(2)}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => {
                  const itemId = item.name || item.code || item.id
                  const itemPrice = item.package_price || item.price || 0
                  const isPackage = item.type === 'package'

                  return (
                    <div key={itemId} className="space-y-3">
                      {/* Main Item/Package */}
                      <div className="flex gap-3 items-start">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 border p-1 shrink-0">
                          <img
                            src={item.image?.startsWith('http') ? item.image : `${ASSET_BASE_URL}${item.image || ''}`}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate uppercase">{item.title || item.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold">QTY: {item.quantity || 1}</p>
                          {item.code && (
                            <p className="text-[10px] text-gray-400">Code: {item.code}</p>
                          )}
                        </div>
                        <p className="text-xs font-bold text-gray-900">${(itemPrice * (item.quantity || 1)).toFixed(2)}</p>
                      </div>

                      {/* Package Sub-items (read-only) */}
                      {isPackage && item.items && Array.isArray(item.items) && item.items.length > 0 && (
                        <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-2">
                          {item.items.map((subItem, idx) => {
                            const subItemCode = subItem.code || subItem.item_code || subItem.name
                            const subItemTitle = subItem.title || subItem.name
                            const subItemQty = subItem.quantity || 1

                            return (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                {subItem.image && (
                                  <div className="w-8 h-8 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    <img
                                      src={subItem.image?.startsWith('http') ? subItem.image : `${ASSET_BASE_URL}${subItem.image}`}
                                      alt={subItemTitle}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-700 truncate">{subItemTitle}</p>
                                  <p className="text-[10px] text-gray-500">Code: {subItemCode}</p>
                                </div>
                                <div className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                                  Qty: {subItemQty}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
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
