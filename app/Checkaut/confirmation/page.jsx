'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationPage() {
  const router = useRouter()
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    setOrderId(localStorage.getItem('salesOrder') || '')
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <div className="bg-white p-12 rounded-3xl border shadow-xl">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={72} className="text-[#00C985]" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">Order ID: <span className="font-bold text-[#00C985]">#{orderId}</span></p>
        
        <Button 
          onClick={() => { localStorage.clear(); router.push('/') }} 
          className="bg-[#00C985] text-white px-10 h-14 rounded-2xl"
        >
          Return to Home
        </Button>
      </div>
    </div>
  )
}