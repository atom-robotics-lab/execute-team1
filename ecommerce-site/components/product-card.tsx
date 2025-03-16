"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart, ShoppingCart } from "lucide-react"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-56 bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.title}
            fill
            className="object-contain p-4"
          />

          {product.oldPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">{product.title}</h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </Link>

        <div
          className={`mt-4 flex items-center justify-between transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
          <button className="flex-grow ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

