"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, Heart, ShoppingCart, Share2, Check } from "lucide-react"
import { products } from "@/data/products"
import { reviews as initialReviews } from "@/data/reviews"
import type { Review } from "@/data/products"
import Header from "@/components/header"
import ReviewSection from "@/components/review-section"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  // Mock multiple product images
  const productImages = [
    product?.image || "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400&text=Image+2",
    "/placeholder.svg?height=400&width=400&text=Image+3",
    "/placeholder.svg?height=400&width=400&text=Image+4",
  ]

  useEffect(() => {
    // Filter reviews for this product
    const productReviews = initialReviews.filter((review) => review.productId === productId)
    setReviews(productReviews)
  }, [productId])

  if (!product) {
    return <div className="text-center py-20">Product not found</div>
  }

  const addReview = (newReview: Omit<Review, "id" | "date" | "productId">) => {
    const review: Review = {
      id: reviews.length + 1,
      productId,
      date: new Date().toISOString(),
      ...newReview,
    }

    setReviews((prev) => [...prev, review])

    // In a real app, you would send this to an API
    console.log("New review added:", review)
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-blue-500" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <Link href="#reviews" className="text-sm text-blue-600 hover:underline">
                    {reviews.length} Reviews
                  </Link>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <>
                      <span className="ml-2 text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                      <span className="ml-2 text-sm font-medium text-red-600">
                        Save ${(product.oldPrice - product.price).toFixed(2)} (
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%)
                      </span>
                    </>
                  )}
                </div>

                <p className="text-base text-gray-700 mb-6">{product.description}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {isAddedToCart ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex items-center justify-center py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>

                  <button className="hidden sm:flex items-center justify-center p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-5 list-disc text-sm text-gray-700">
                    {product.highlights?.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t border-gray-200 px-6 py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.fullDescription || product.description}</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="border-t border-gray-200 px-6 py-8">
            <ReviewSection reviews={reviews} onAddReview={addReview} productId={productId} />
          </div>
        </div>
      </main>
    </div>
  )
}

