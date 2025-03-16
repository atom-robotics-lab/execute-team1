"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import type { Product } from "@/data/products"

interface FeaturedProductProps {
  product: Product
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`flex flex-col h-full justify-center transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="relative w-40 h-40">
          <Image
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="mt-auto bg-white/90 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex items-center mb-2">
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
        <h3 className="font-bold text-gray-900 mb-1">{product.title}</h3>
        <p className="text-blue-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
        <Link
          href={`/product/${product.id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Details <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

