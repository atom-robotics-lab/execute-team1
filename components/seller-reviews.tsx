import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock review statistics data
const reviewStats = {
  1: {
    averageRating: 4.2,
    totalReviews: 128,
    ratingDistribution: [
      { rating: 5, count: 75 },
      { rating: 4, count: 32 },
      { rating: 3, count: 15 },
      { rating: 2, count: 4 },
      { rating: 1, count: 2 },
    ],
    sentimentAnalysis: {
      positive: 82,
      neutral: 12,
      negative: 6,
    },
    monthlyReviews: [
      { month: "Jan", reviews: 8 },
      { month: "Feb", reviews: 12 },
      { month: "Mar", reviews: 15 },
      { month: "Apr", reviews: 10 },
      { month: "May", reviews: 18 },
      { month: "Jun", reviews: 22 },
      { month: "Jul", reviews: 17 },
      { month: "Aug", reviews: 14 },
      { month: "Sep", reviews: 12 },
      { month: "Oct", reviews: 0 },
      { month: "Nov", reviews: 0 },
      { month: "Dec", reviews: 0 },
    ],
    keywordMentions: [
      { keyword: "sound quality", count: 45 },
      { keyword: "comfort", count: 38 },
      { keyword: "battery life", count: 32 },
      { keyword: "noise cancellation", count: 28 },
      { keyword: "price", count: 15 },
    ],
  },
  2: {
    averageRating: 4.5,
    totalReviews: 95,
    ratingDistribution: [
      { rating: 5, count: 65 },
      { rating: 4, count: 22 },
      { rating: 3, count: 5 },
      { rating: 2, count: 2 },
      { rating: 1, count: 1 },
    ],
    sentimentAnalysis: {
      positive: 87,
      neutral: 8,
      negative: 5,
    },
    monthlyReviews: [
      { month: "Jan", reviews: 5 },
      { month: "Feb", reviews: 8 },
      { month: "Mar", reviews: 12 },
      { month: "Apr", reviews: 15 },
      { month: "May", reviews: 10 },
      { month: "Jun", reviews: 14 },
      { month: "Jul", reviews: 11 },
      { month: "Aug", reviews: 9 },
      { month: "Sep", reviews: 11 },
      { month: "Oct", reviews: 0 },
      { month: "Nov", reviews: 0 },
      { month: "Dec", reviews: 0 },
    ],
    keywordMentions: [
      { keyword: "battery life", count: 42 },
      { keyword: "health tracking", count: 38 },
      { keyword: "design", count: 25 },
      { keyword: "app", count: 18 },
      { keyword: "notifications", count: 15 },
    ],
  },
  3: {
    averageRating: 4.0,
    totalReviews: 78,
    ratingDistribution: [
      { rating: 5, count: 45 },
      { rating: 4, count: 20 },
      { rating: 3, count: 8 },
      { rating: 2, count: 3 },
      { rating: 1, count: 2 },
    ],
    sentimentAnalysis: {
      positive: 75,
      neutral: 15,
      negative: 10,
    },
    monthlyReviews: [
      { month: "Jan", reviews: 0 },
      { month: "Feb", reviews: 0 },
      { month: "Mar", reviews: 5 },
      { month: "Apr", reviews: 8 },
      { month: "May", reviews: 12 },
      { month: "Jun", reviews: 15 },
      { month: "Jul", reviews: 18 },
      { month: "Aug", reviews: 10 },
      { month: "Sep", reviews: 10 },
      { month: "Oct", reviews: 0 },
      { month: "Nov", reviews: 0 },
      { month: "Dec", reviews: 0 },
    ],
    keywordMentions: [
      { keyword: "sound quality", count: 35 },
      { keyword: "fit", count: 28 },
      { keyword: "battery life", count: 22 },
      { keyword: "noise cancellation", count: 18 },
      { keyword: "price", count: 12 },
    ],
  },
  4: {
    averageRating: 4.3,
    totalReviews: 65,
    ratingDistribution: [
      { rating: 5, count: 40 },
      { rating: 4, count: 18 },
      { rating: 3, count: 5 },
      { rating: 2, count: 1 },
      { rating: 1, count: 1 },
    ],
    sentimentAnalysis: {
      positive: 80,
      neutral: 12,
      negative: 8,
    },
    monthlyReviews: [
      { month: "Jan", reviews: 0 },
      { month: "Feb", reviews: 0 },
      { month: "Mar", reviews: 0 },
      { month: "Apr", reviews: 5 },
      { month: "May", reviews: 8 },
      { month: "Jun", reviews: 12 },
      { month: "Jul", reviews: 15 },
      { month: "Aug", reviews: 13 },
      { month: "Sep", reviews: 12 },
      { month: "Oct", reviews: 0 },
      { month: "Nov", reviews: 0 },
      { month: "Dec", reviews: 0 },
    ],
    keywordMentions: [
      { keyword: "sound quality", count: 30 },
      { keyword: "portability", count: 25 },
      { keyword: "battery life", count: 20 },
      { keyword: "durability", count: 15 },
      { keyword: "price", count: 10 },
    ],
  },
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface SellerReviewsProps {
  productId: number
}

export function SellerReviews({ productId }: SellerReviewsProps) {
  const stats = reviewStats[productId as keyof typeof reviewStats]

  if (!stats) {
    return <p>No review statistics available for this product.</p>
  }

  const sentimentData = [
    { name: "Positive", value: stats.sentimentAnalysis.positive },
    { name: "Neutral", value: stats.sentimentAnalysis.neutral },
    { name: "Negative", value: stats.sentimentAnalysis.negative },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Seller Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.averageRating.toFixed(1)}/5</div>
            <p className="text-sm text-muted-foreground">Based on {stats.totalReviews} reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalReviews}</div>
            <p className="text-sm text-muted-foreground">Lifetime reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.sentimentAnalysis.positive}%</div>
            <p className="text-sm text-muted-foreground">Positive sentiment</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="distribution">Rating Distribution</TabsTrigger>
          <TabsTrigger value="trends">Review Trends</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="keywords">Key Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.ratingDistribution.map((item) => (
                  <div key={item.rating} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">{item.rating} Star</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.count} ({Math.round((item.count / stats.totalReviews) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(item.count / stats.totalReviews) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Review Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyReviews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reviews" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Most Mentioned Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={stats.keywordMentions}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="keyword" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

