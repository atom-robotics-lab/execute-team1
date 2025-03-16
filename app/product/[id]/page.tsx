"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { StarRating } from "@/components/star-rating"
import { products } from "@/lib/data"
import { Button, Card, Select, Tabs, TabContent } from "@/components/ui-components"
import { CustomerReviews } from "@/components/customer-reviews"
import RelatedProducts from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState("1")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const { addToCart } = useCart()

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const productId = Number.parseInt(params.id)
    const foundProduct = products.find((p) => p.id === productId)
    setProduct(foundProduct)

    if (foundProduct?.colors?.length) {
      setSelectedColor(foundProduct.colors[0])
    }

    if (foundProduct?.sizes?.length) {
      setSelectedSize(foundProduct.sizes[0])
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: Number.parseInt(quantity),
      selectedColor,
      selectedSize,
    })

    alert(`${product.name} has been added to your cart`)
  }

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity: Number.parseInt(quantity),
      selectedColor,
      selectedSize,
    })

    // In a real app, you would redirect to checkout
    window.location.href = "/checkout"
  }

  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }))

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>

          {product.gallery && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.gallery.map((img: string, idx: number) => (
                <div key={idx} className="relative h-20 w-20 flex-shrink-0 rounded border overflow-hidden">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              options={quantityOptions}
              className="w-24"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Free shipping on orders over $50</p>
            <p>30-day easy returns</p>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        <TabContent id="description" activeTab={activeTab}>
          <Card>
            <div className="p-6">
              <p className="leading-relaxed">{product.description}</p>

              {product.features && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </TabContent>

        <TabContent id="specifications" activeTab={activeTab}>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications &&
                  product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex border-b pb-2">
                      <span className="font-medium w-1/2">{spec.name}:</span>
                      <span className="w-1/2">{spec.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        </TabContent>

        <TabContent id="reviews" activeTab={activeTab}>
          <CustomerReviews productId={product.id} />
        </TabContent>
      </Tabs>

      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}

