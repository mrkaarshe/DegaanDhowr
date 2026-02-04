'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Phone, Mail, MapPin, Clock, Send, 
  ShieldCheck, Zap, Globe, Heart 
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <main className="min-h-screen bg-[#FAFBFC] pb-20">
      {/* 1. TOP INFO SECTION */}
      <section className=" py-16 md:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <span className="inline-block px-4 py-1.5 bg-green-500/10 text-primary rounded-full text-sm font-medium mb-4">

        Contact Us

        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">

        Get in <span className="text-primary">Touch</span>

        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">

        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.

        </p>

        </div>

        </section>
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-sm">Phone</h3>
              <p className="text-gray-500 text-xs">(061)556-5681</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-sm">Email</h3>
              <p className="text-gray-500 text-xs">Info@degaandhowr.com</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-2">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-sm">Address</h3>
              <p className="text-gray-500 text-xs">Mogadishu, Somalia</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-2">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-sm">Working Hours</h3>
              <p className="text-gray-500 text-xs">Sat. - Thurs: 8am - 6pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPLIT FORM & MAP */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* SHADCN FORM CARD */}
            <Card className="border-none  rounded-lg overflow-hidden bg-white">
              <CardHeader className="bg-white border-b border-gray-50 p-8">
                <CardTitle className="text-2xl font-black text-gray-900">Send us a Message</CardTitle>
                <p className="text-sm text-gray-500">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">Full Name *</Label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="John Doe" 
                      required 
                      className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white h-12 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold text-gray-700">Email Address *</Label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="john@example.com" 
                        required 
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white h-12 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-gray-700">Phone Number</Label>
                      <Input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+252 61 XXX XXXX" 
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white h-12 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">How can we help? *</Label>
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us how we can help..." 
                      required 
                      className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white min-h-[120px] transition-all"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#00C985] hover:bg-[#00b377] text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-green-100 transition-all active:scale-95">
                    {submitted ? "Message Sent Successfully!" : "Send Message"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* MAP SECTION */}
            <div className="flex flex-col space-y-6">
              <div className="rounded-lg overflow-hidden  h-full min-h-[400px]  transition-all duration-1000">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127593.43444464871!2d45.234390666601445!3d2.0469342533230685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955794347%3A0xefc4120235948303!2sMogadishu!5e0!3m2!1sen!2sso!4v1700000000000!5m2!1sen!2sso" 
                  className="w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW TRUST SECTION (DECORATIVE) */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-[3rem] p-12 border border-gray-50 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center  shadow-green-100">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-black text-lg">Secure Contact</h3>
            <p className="text-gray-500 text-sm">Your data is 100% protected and encrypted with us.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center  shadow-blue-100">
              <Zap size={28} />
            </div>
            <h3 className="font-black text-lg">Fast Response</h3>
            <p className="text-gray-500 text-sm">We'll get back to you within 2 hours of your message.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center  shadow-orange-100">
              <Heart size={28} />
            </div>
            <h3 className="font-black text-lg">Customer Care</h3>
            <p className="text-gray-500 text-sm">Our team is dedicated to your satisfaction 24/7.</p>
          </div>
        </div>
      </section>
    </main>
  )
}