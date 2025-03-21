export interface Review {
  id: number
  productId: number
  name: string
  email: string
  rating: number
  title: string
  comment: string
  date: string
}

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    name: "John Smith",
    email: "john@example.com",
    rating: 5,
    title: "Best headphones I've ever owned",
    comment: "The sound quality is amazing and the noise cancellation works perfectly. Battery life is impressive too!",
    date: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    productId: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    rating: 4,
    title: "Great sound, slightly uncomfortable",
    comment: "The sound quality is excellent but they get a bit uncomfortable after wearing them for a few hours.",
    date: "2023-06-02T14:45:00Z",
  },
  {
    id: 3,
    productId: 1,
    name: "Michael Brown",
    email: "michael@example.com",
    rating: 5,
    title: "Worth every penny",
    comment: "These headphones are amazing! The noise cancellation is perfect for my daily commute.",
    date: "2023-06-20T09:15:00Z",
  },
  {
    id: 4,
    productId: 2,
    name: "Emily Davis",
    email: "emily@example.com",
    rating: 5,
    title: "Stunning picture quality",
    comment: "The 4K resolution is incredible and the smart features work seamlessly. Very happy with this purchase!",
    date: "2023-04-10T16:20:00Z",
  },
  {
    id: 5,
    productId: 2,
    name: "David Wilson",
    email: "david@example.com",
    rating: 4,
    title: "Great TV, but the remote could be better",
    comment: "The picture quality is excellent but the remote feels cheap and the button layout is confusing.",
    date: "2023-05-05T11:30:00Z",
  },
  {
    id: 6,
    productId: 3,
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    rating: 5,
    title: "Professional quality photos",
    comment: "This camera has exceeded my expectations. The image quality is outstanding and the 4K video is smooth.",
    date: "2023-03-22T13:45:00Z",
  },
  {
    id: 7,
    productId: 4,
    name: "Robert Taylor",
    email: "robert@example.com",
    rating: 4,
    title: "Great phone, battery could be better",
    comment:
      "The display and camera are excellent, but the battery life is just average. Otherwise, it's a great phone.",
    date: "2023-06-15T10:10:00Z",
  },
  {
    id: 8,
    productId: 5,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    rating: 5,
    title: "Perfect for work and travel",
    comment:
      "This laptop is incredibly lightweight yet powerful. The battery lasts all day and the display is gorgeous.",
    date: "2023-05-30T15:20:00Z",
  },
  {
    id: 9,
    productId: 6,
    name: "Kevin Martin",
    email: "kevin@example.com",
    rating: 3,
    title: "Good, but not great",
    comment: "The fitness tracking is accurate but the app is a bit clunky. Battery life is good though.",
    date: "2023-04-25T09:30:00Z",
  },
  {
    id: 10,
    productId: 7,
    name: "Amanda White",
    email: "amanda@example.com",
    rating: 4,
    title: "Great sound for the size",
    comment: "These earbuds sound amazing for their size. The touch controls take some getting used to though.",
    date: "2023-06-10T14:15:00Z",
  },
]

