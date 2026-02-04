"use client"
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
const BASE_URL = "http://127.0.0.1:8000"
const Order_URL = "/api/external/confirm-order"
const [procducts, setProducts] = useState([])
const [isLoading, setIsLoading] = useState(true)
const orderedItems = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('orderedItems') || '[]') : []
const costomerInfo = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('customerInfo') || '{}') : {}



const fetchData = async (url) => {


  const res = await axios.post(url,{
    orderedItems: orderedItems,
    costomerInfo: costomerInfo
  },{
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


useEffect(() => {
  fetchData('/api/external/confirm-order')
    .then(data => {
      console.log('Order confirmed:', data)
    })
    .catch(error => {
      console.error('Error confirming order:', error)
    })
}, [])


export const page = () => {
    
  return (
    <div>
        <main className="min-h-screen bg-white flex items-center justify-center py-20">
            <Card className="max-w-md w-full p-6 shadow-lg border border-gray-100"> 
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-green-600">
                        Thank You for Your Order!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 mb-4">
                        We appreciate your business. Your order has been successfully placed and is being processed.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-800">Order Summary:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {orderedItems.map((item, index) => (
                                <li key={index} className="text-gray-700">
                                    {item.name} x {item.quantity} - ${item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 font-bold text-gray-900">
                            Total: ${orderedItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </p>
                    </div>
                    <div className="mt-6 text-center">
                        <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  )
}
