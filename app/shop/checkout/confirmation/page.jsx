'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ASSET_BASE_URL } from '@/lib/api/config'

export default function ConfirmationPage() {
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({})
  const [orderedItems, setOrderedItems] = useState([])
  const [salesOrder, setSalesOrder] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = JSON.parse(localStorage.getItem('customerInfo') || '{}')
      const items = JSON.parse(localStorage.getItem('orderedItems') || '[]')
      const order = localStorage.getItem('salesOrder') || ''
      setCustomerInfo(info)
      setOrderedItems(items)
      setSalesOrder(order)
    }
  }, [])

  const total = orderedItems.reduce((acc, item) => {
    const price = item.package_price || item.price || 0
    return acc + (price * (item.quantity || 1))
  }, 0)
  const finalTotal = total + (total * 0.01)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="relative w-full max-w-2xl rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Mobile Money
            </span>
            <Smartphone className="text-green-500/80" />
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#00C985]/10 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} className="text-[#00C985]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Confirmed
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Your order is being processed and will be delivered shortly.
            </p>
            {salesOrder && (
              <div className="inline-block px-4 py-2 bg-gray-50 rounded-full text-sm font-bold text-gray-500 mb-4">
                Order ID: <span className="text-[#00C985]">#{salesOrder}</span>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="text-lg font-bold text-gray-900">
              {customerInfo.fullName || '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile Number</p>
            <p className="text-lg font-mono font-bold text-gray-900">
              {customerInfo.phone || '—'}
            </p>
          </div>

          {/* Order Products */}
          {orderedItems.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ordered Products</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orderedItems.map((item) => {
                  const itemId = item.name || item.code || item.id
                  const itemPrice = item.package_price || item.price || 0
                  const isPackage = item.type === 'package'
                  
                  return (
                    <div key={itemId} className="space-y-3 pb-4 border-b last:border-b-0">
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
                          <p className="text-sm font-bold text-gray-800 truncate">{item.title || item.name}</p>
                          <p className="text-xs text-gray-500 font-semibold">QTY: {item.quantity || 1}</p>
                          {item.code && (
                            <p className="text-xs text-gray-400">Code: {item.code}</p>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-900">${(itemPrice * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                      
                      {/* Package Sub-items (read-only) */}
                      {isPackage && item.items && Array.isArray(item.items) && item.items.length > 0 && (
                        <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-2">
                          <p className="text-xs font-medium text-gray-600 mb-1">Package includes:</p>
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
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-2xl font-black text-[#00C985]">
              ${finalTotal.toFixed(2)}
            </p>
          </div>

          <div className="h-2 w-full rounded-full bg-green-500/80" />

          <Button 
            onClick={() => {
              localStorage.removeItem('customerInfo')
              localStorage.removeItem('orderedItems')
              localStorage.removeItem('salesOrder')
              router.push('/')
            }} 
            className="w-full h-12 bg-[#00C985] hover:bg-[#00b377] text-white font-bold"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}
