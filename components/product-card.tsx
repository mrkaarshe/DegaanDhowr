'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Plus, Check, Eye, Package, Box } from 'lucide-react'
import { ASSET_BASE_URL } from '@/lib/api/config'

type Product = {
  name: string
  code: string
  title: string
  price: number
  image?: string
  type: 'item' | 'package'
  description?: string
}

export default function ProductCard({
  product,
  isAdded,
  onAdd,
}: {
  product: Product
  isAdded: boolean
  onAdd: (e: React.MouseEvent) => void
}) {
  const imgSrc =
    product.image?.startsWith('http')
      ? product.image
      : `${ASSET_BASE_URL}${product.image || ''}`

  const isPackage = (product.type || '').toLowerCase() === 'package'

  return (
    <Card className="group overflow-hidden border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <Link href={`/shop/products/detail/${product.code}`} className="block">
        <div className="relative aspect-square bg-[#F7F7F7] overflow-hidden rounded-xl m-3">
          <img
            src={imgSrc}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2 shadow-sm backdrop-blur-md border border-white/20
              ${isPackage ? 'bg-[#00C985]/90 text-white' : 'bg-white/85 text-gray-900'}
            `}
          >
            {isPackage ? <Package size={12} /> : <Box size={12} />}
            {isPackage ? 'PACKAGE' : 'ITEM'}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Code */}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {product.code || 'DEGAAN-ITEM'}
        </p>

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3 mt-1">
          <h3 className="text-sm font-extrabold text-gray-900 line-clamp-1 group-hover:text-[#00C985] transition-colors">
            {product.title}
          </h3>

          <span className="text-[15px] font-extrabold text-gray-900 whitespace-nowrap">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        {/* Description */}
        {product.description ? (
          <p className="mt-2 text-xs text-gray-500 leading-5 line-clamp-2 min-h-[40px]">
            {product.description}
          </p>
        ) : (
          <div className="mt-2 min-h-[40px]" />
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={onAdd}
            className={`flex-1 h-11 rounded-xl text-[11px] font-extrabold tracking-[0.12em] flex items-center justify-center gap-2 transition-all active:scale-[0.98]
              ${isAdded ? 'bg-black text-white' : 'bg-[#00C985] text-white hover:bg-black'}
            `}
          >
            {isAdded ? <Check size={16} /> : <Plus size={16} />}
            {isAdded ? 'ADDED' : 'ADD PRODUCT'}
          </button>

          <Link
            href={`/shop/products/detail/${product.code}`}
            className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition"
            aria-label="View details"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
    </Card>
  )
}
