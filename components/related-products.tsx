"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { StarRating } from "@/components/star-rating"
import { products } from "@/lib/data"
import { Card, Button } from "@/components/ui-components"

interface RelatedProductsProps {
  currentProductId: number
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { addToCart } = useCart()

  // Filter out current product and get 4 random products
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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
                <h3 className="font-semibold hover:text-blue-600 transition-colors">{product.name}</h3>
              </Link>
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

