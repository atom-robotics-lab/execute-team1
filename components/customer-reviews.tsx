"use client"

import type React from "react"

import { useState } from "react"
import { StarRating } from "@/components/star-rating"
import { Button, Card, Input, Textarea } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Mock review data
const initialReviews = [
  {
    id: 1,
    productId: 1,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
    },
    rating: 5,
    date: "2023-10-15",
    title: "Amazing product!",
    comment:
      "These headphones are incredible. The sound quality is top-notch and the noise cancellation works perfectly. Battery life is as advertised. Highly recommend!",
  },
  {
    id: 2,
    productId: 1,
    user: {
      name: "Sarah Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SS",
    },
    rating: 4,
    date: "2023-09-28",
    title: "Great value",
    comment:
      "Very comfortable and the sound quality is excellent. The only reason I'm giving 4 stars instead of 5 is that the app is a bit buggy sometimes.",
  },
  {
    id: 3,
    productId: 1,
    user: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
    },
    rating: 3,
    date: "2023-10-02",
    title: "Good but not great",
    comment:
      "The sound quality is good, but I expected better noise cancellation at this price point. They're comfortable to wear for long periods though.",
  },
  {
    id: 4,
    productId: 2,
    user: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
    rating: 5,
    date: "2023-10-10",
    title: "Perfect smartwatch!",
    comment:
      "This watch has everything I need. The health tracking is accurate and the battery lasts for days. Very happy with my purchase.",
  },
]

interface CustomerReviewsProps {
  productId: number
}

export function CustomerReviews({ productId }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    name: "",
    email: "",
  })

  // Filter reviews for this product
  const filteredReviews = reviews.filter((review) => review.productId === productId)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new review
    const review = {
      id: Math.max(0, ...reviews.map((r) => r.id)) + 1,
      productId,
      user: {
        name: newReview.name,
        avatar: "/placeholder.svg?height=40&width=40",
        initials: newReview.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      },
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      title: newReview.title,
      comment: newReview.comment,
    }

    // Add to reviews
    setReviews([...reviews, review])

    // Reset form and close modal
    setNewReview({
      rating: 5,
      title: "",
      comment: "",
      name: "",
      email: "",
    })
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button onClick={() => setIsModalOpen(true)}>Write a Review</Button>
      </div>

      {filteredReviews.length === 0 ? (
        <p>No reviews yet for this product. Be the first to leave a review!</p>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {review.user.avatar ? (
                      <Image
                        src={review.user.avatar || "/placeholder.svg"}
                        alt={review.user.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="text-sm font-medium">{review.user.initials}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.user.name}</h3>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <h4 className="font-medium mt-2">{review.title}</h4>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Share your thoughts about this product.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-2xl"
                  >
                    {star <= newReview.rating ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="review-title" className="block text-sm font-medium mb-1">
                Title
              </Label>
              <Input
                id="review-title"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Summarize your experience"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="review-comment" className="block text-sm font-medium mb-1">
                Review
              </Label>
              <Textarea
                id="review-comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this product"
                rows={4}
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="review-name" className="block text-sm font-medium mb-1">
                Name
              </Label>
              <Input
                id="review-name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="review-email" className="block text-sm font-medium mb-1">
                Email
              </Label>
              <Input
                id="review-email"
                type="email"
                value={newReview.email}
                onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                placeholder="Your email (won't be published)"
                required
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

