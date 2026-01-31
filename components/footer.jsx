'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
                        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl text-primary">
            
              <img src="/degaan-logo.png" className='h-18' alt="DeegaDhowr Logo" />
           
          </Link>
             
            </div>
            <p className="text-gray-300 text-sm">Professional cleaning services for your home and business.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                Home
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                Services
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                Products
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Support</h3>
            <div className="space-y-2">
              <Link href="/contact" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                Contact Us
              </Link>
              <Link href="/career" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                Careers
              </Link>
              <a href="tel:+1234567890" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                +1 (234) 567-890
              </a>
              <a href="mailto:info@cleanserve.com" className="text-gray-300 hover:text-primary text-sm transition-colors block">
                info@cleanserve.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2026 <a href="https://engkaarshe.vercel.app/" className="text-primary hover:underline">EngKaarshe</a>. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
