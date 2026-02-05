'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Smartphone } from 'lucide-react'

const ORDER_URL = 'http://192.168.8.11:8000/api/method/degaan_shop.degaan_shop.api.order.create_order_and_pay'

export default function Page() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)

  const customerInfo =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('customerInfo') || '{}')
      : {}

  const orderedItems =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('orderedItems') || '[]')
      : []

  useEffect(() => {
    const sendOrder = async () => {
      try {
        const payload = {
          order: {
            customer_full_name: customerInfo.fullName,
            customer_phone: customerInfo.phone,
            region: customerInfo.region,
            district: customerInfo.district,
            address: customerInfo.address,
            items: orderedItems.map(i => ({
              item_code: i.sku || i.id,
              qty: i.quantity,
              price: i.price,
            })),
            total: orderedItems.reduce(
              (t, i) => t + i.price * i.quantity,
              0
            ),
            notes: 'Order from web',
          },
        }

        const res = await fetch(ORDER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`)
        }

        setTimeout(() => {
          setIsSuccess(true)
          setIsLoading(false)
        }, 1200)

        setTimeout(() => {
          router.push('/')
        }, 3000)
      } catch (err) {
        console.error('Network Error:', err)
        setError('Failed to send order. Please try again.')
        setIsLoading(false)
      }
    }

    sendOrder()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="relative w-full max-w-md rounded-2xl border bg-white shadow-sm overflow-hidden">

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500/80 border-t-transparent mb-4" />
            <p className="text-sm font-semibold text-gray-700">
              Processing your order…
            </p>
          </div>
        )}

        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white text-center px-6">
            <CheckCircle2 size={44} className="text-green-500/80 mb-3" />
            <h2 className="text-xl font-bold text-gray-900">
              Order Confirmed
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your order is being processed and will be delivered shortly.
            </p>
          </div>
        )}

        {/* Error Overlay */}
        {error && !isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-50 text-center px-6">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Mobile Money
            </span>
            <Smartphone className="text-green-500/80" />
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

          <div className="h-2 w-full rounded-full bg-green-500/80" />
        </div>
      </div>
    </div>
  )
}
