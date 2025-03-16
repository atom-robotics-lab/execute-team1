"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { StarRating } from "@/components/star-rating"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/data"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToCart } = useCart()

  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // Format category name for display
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Filter products by category and apply other filters
  useEffect(() => {
    let result = products.filter((product) => product.category === slug.replace("-", ""))

    // Apply price filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply color filter if any colors are selected
    if (selectedColors.length > 0) {
      result = result.filter((product) => product.colors?.some((color) => selectedColors.includes(color)))
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      // Default: featured/newest
      return 0
    })

    setFilteredProducts(result)
  }, [slug, sortBy, priceRange, selectedColors])

  // Get all available colors for this category
  const availableColors = Array.from(
    new Set(
      products
        .filter((product) => product.category === slug.replace("-", ""))
        .flatMap((product) => product.colors || []),
    ),
  )

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Filters</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 300]}
                  max={300}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {availableColors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Colors</h3>
                  <div className="space-y-2">
                    {availableColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => handleColorToggle(color)}
                        />
                        <Label htmlFor={`color-${color}`} className="cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 300])
                  setSelectedColors([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 300])
                  setSelectedColors([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <Link href={`/product/${product.id}`} className="relative block h-48 w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <StarRating rating={product.rating} />
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h2 className="text-xl font-semibold hover:text-primary transition-colors">{product.name}</h2>
                    </Link>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

