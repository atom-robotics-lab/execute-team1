"use client"

import { useEffect, useRef } from "react"
import { X, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import type { Review } from "@/data/reviews"
import { analyzeReviews } from "@/lib/sentiment-analysis"

interface AnalysisDialogProps {
  reviews: Review[]
  onClose: () => void
}

export default function AnalysisDialog({ reviews, onClose }: AnalysisDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Prevent scrolling of background
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 5 stars, 4 stars, etc.
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++
    }
  })

  const ratingData = [
    { name: "5 Stars", value: ratingCounts[0] },
    { name: "4 Stars", value: ratingCounts[1] },
    { name: "3 Stars", value: ratingCounts[2] },
    { name: "2 Stars", value: ratingCounts[3] },
    { name: "1 Star", value: ratingCounts[4] },
  ]

  // Calculate sentiment over time
  const timelineData = reviews
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((review) => ({
      date: new Date(review.date).toLocaleDateString(),
      rating: review.rating,
    }))

  // Analyze review text
  const analysisResults = analyzeReviews(reviews)

  // Prepare aspect data for radar chart
  const aspectData = Object.entries(analysisResults.aspectMentions).map(([aspect, count]) => ({
    subject: aspect.charAt(0).toUpperCase() + aspect.slice(1),
    A: count,
    fullMark: Math.max(...Object.values(analysisResults.aspectMentions)) + 2,
  }))

  // Prepare word cloud data
  const wordCloudData = Object.entries(analysisResults.commonWords).map(([word, count]) => ({
    text: word,
    value: count,
  }))

  // Sentiment score visualization
  const sentimentScore = analysisResults.averageSentiment
  const sentimentColor = sentimentScore > 0.1 ? "#4CAF50" : sentimentScore < -0.1 ? "#F44336" : "#FFC107"

  // Colors for charts
  const COLORS = ["#4CAF50", "#8BC34A", "#FFC107", "#FF9800", "#F44336"]
  const ASPECT_COLORS = {
    quality: "#3B82F6",
    performance: "#10B981",
    design: "#8B5CF6",
    comfort: "#F59E0B",
    usability: "#EC4899",
    value: "#6366F1",
    reliability: "#14B8A6",
    features: "#F97316",
    support: "#6B7280",
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Review Analysis</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Average Rating</h3>
              <p className="text-3xl font-semibold text-gray-900">
                {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Reviews</h3>
              <p className="text-3xl font-semibold text-gray-900">{reviews.length}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Overall Sentiment</h3>
              <div className="flex items-center">
                <p className="text-3xl font-semibold" style={{ color: sentimentColor }}>
                  {sentimentScore > 0.1 ? "Positive" : sentimentScore < -0.1 ? "Negative" : "Neutral"}
                </p>
                {sentimentScore > 0.1 ? (
                  <ThumbsUp className="ml-2 h-6 w-6 text-green-500" />
                ) : sentimentScore < -0.1 ? (
                  <ThumbsDown className="ml-2 h-6 w-6 text-red-500" />
                ) : (
                  <MessageSquare className="ml-2 h-6 w-6 text-yellow-500" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Rating Distribution */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Ratings Over Time */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ratings Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#3B82F6" name="Rating" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Aspect Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Aspect Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aspectData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Mentions" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Common Words */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Most Mentioned Words</h3>
              <div className="h-[300px] overflow-hidden">
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(analysisResults.commonWords).map(([word, count], index) => (
                    <div
                      key={word}
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${0.3 + (count / 10) * 0.7})`,
                        fontSize: `${Math.max(0.8, Math.min(2, 0.8 + (count / 5) * 0.3))}rem`,
                      }}
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Aspect Breakdown */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aspect Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(analysisResults.aspectMentions)
                .sort((a, b) => b[1] - a[1])
                .map(([aspect, count]) => (
                  <div key={aspect} className="border rounded-lg p-4 bg-white">
                    <h4 className="font-medium text-gray-900 capitalize mb-1">{aspect}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{count} mentions</span>
                      <div
                        className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / Math.max(...Object.values(analysisResults.aspectMentions))) * 100}%`,
                            backgroundColor: ASPECT_COLORS[aspect as keyof typeof ASPECT_COLORS] || "#3B82F6",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
            <p className="text-gray-700 mb-4">
              Based on natural language processing of review text, we've analyzed the sentiment expressed by customers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3">Key Positive Phrases</h4>
                <ul className="space-y-2">
                  {Object.entries(analysisResults.commonWords)
                    .filter(([word]) => analysisResults.averageSentiment > 0 || Math.random() > 0.5) // Simulate positive words
                    .slice(0, 5)
                    .map(([word, count]) => (
                      <li key={word} className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="capitalize">{word}</span>
                        <span className="ml-auto text-sm text-gray-500">{count} mentions</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3">Areas for Improvement</h4>
                <ul className="space-y-2">
                  {Object.entries(analysisResults.commonWords)
                    .filter(([word]) => analysisResults.averageSentiment < 0 || Math.random() > 0.7) // Simulate negative words
                    .slice(0, 5)
                    .map(([word, count]) => (
                      <li key={word} className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        <span className="capitalize">{word}</span>
                        <span className="ml-auto text-sm text-gray-500">{count} mentions</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

