"use client"

import { useState } from "react"
import { Star, MessageSquare, BarChart2 } from "lucide-react"
import ReviewForm from "./review-form"
import AnalysisDialog from "./analysis-dialog"
import type { Review } from "@/data/reviews"

interface ReviewSectionProps {
  reviews: Review[]
  productId: number
  onAddReview: (review: Omit<Review, "id" | "date" | "productId">) => void
}

export default function ReviewSection({ reviews, productId, onAddReview }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Calculate average rating
  const avgRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Count ratings by star
  const ratingCounts = [0, 0, 0, 0, 0] // 5 stars, 4 stars, etc.
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Write a Review
          </button>
          {reviews.length > 0 && (
            <button
              onClick={() => setShowAnalysis(true)}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              Analysis
            </button>
          )}
        </div>
      </div>

      {/* Review Summary */}
      {reviews.length > 0 ? (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating.toFixed(1)}</div>
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex-grow">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[5 - star]
                  const percentage = reviews.length ? (count / reviews.length) * 100 : 0

                  return (
                    <div key={star} className="flex items-center">
                      <div className="w-12 text-sm text-gray-700">{star} star</div>
                      <div className="w-full mx-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm text-gray-500 text-right">{count}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
          <ReviewForm
            onSubmit={(review) => {
              onAddReview(review)
              setShowForm(false)
            }}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-medium text-blue-600">{review.name.charAt(0)}</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Dialog */}
      {showAnalysis && <AnalysisDialog reviews={reviews} onClose={() => setShowAnalysis(false)} />}
    </div>
  )
}

