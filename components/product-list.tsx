"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { StarRating } from "@/components/star-rating"
import { Card, Button, Select } from "@/components/ui-components"
import { products } from "@/lib/data"

export default function ProductList() {
  const [sortBy, setSortBy] = useState("featured")
  const { addToCart } = useCart()

  // Sort products based on selection
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    // Default: featured/newest
    return 0
  })

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Showing {products.length} products</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={sortOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group">
            <Link href={`/product/${product.id}`} className="relative block h-48 w-full overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <div className="mb-2">
                <StarRating rating={product.rating} />
              </div>
              <Link href={`/product/${product.id}`}>
                <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">{product.name}</h2>
              </Link>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <Button size="sm" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

