'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Home, Mail, ArrowRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShippingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    region: 'Banadir',
    district: 'Hodan'
  })

  // Load existing data if any
  useEffect(() => {
    const saved = localStorage.getItem('checkout_info')
    if (saved) setFormData(JSON.parse(saved))
  }, [])

  const handleNext = (e) => {
    e.preventDefault()
    // Save to localStorage so Payment page can access it
    localStorage.setItem('checkout_info', JSON.stringify(formData))
    router.push('/Checkaut/payment')
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white overflow-hidden rounded-2xl border border-gray-100 shadow-sm mt-10">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-[#00C985]" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
      </div>
      <form className="space-y-6" onSubmit={handleNext}>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Region</Label>
            <Select onValueChange={(val) => setFormData({...formData, region: val})} defaultValue={formData.region}>
              <SelectTrigger><SelectValue placeholder="Banadir" /></SelectTrigger>
              <SelectContent className="bg-white"><SelectItem value="Banadir">Banadir</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>District</Label>
            <Select onValueChange={(val) => setFormData({...formData, district: val})} defaultValue={formData.district}>
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
  )
}