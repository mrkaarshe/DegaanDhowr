'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar({ cartCount = 3 }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      
      setIsScrolled(window.scrollY >=10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md py-0 border-b border-gray-100' 
            : 'bg-white py-2'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo - Transparent Background */}
            <Link href="/" className="flex items-center transition-transform hover:scale-105">
              <img src="/degaan-logo.png" className="h-16 w-auto bg-transparent" alt="Logo" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-bold text-black hover:text-green-500 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Icons Section */}
            <div className="flex items-center space-x-5">
              <Link href="/cart" className="relative p-2 text-black hover:text-green-500 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-green-400 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-20 left-4 right-4 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 animate-in fade-in zoom-in duration-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-semibold text-black hover:bg-green-50 hover:text-green-400 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

    </>
  )
}