export interface Product {
  id: number
  title: string
  description: string
  fullDescription?: string
  price: number
  oldPrice?: number
  image: string
  category: string
  rating: number
  highlights?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with premium sound quality",
    fullDescription:
      "Experience immersive sound with our Premium Wireless Headphones. These noise-cancelling over-ear headphones deliver exceptional audio quality with deep bass and crystal-clear highs. The comfortable memory foam ear cushions make them perfect for all-day wear, while the 30-hour battery life ensures your music never stops. With quick charging capability, you get 5 hours of playback with just 10 minutes of charging.",
    price: 249.99,
    oldPrice: 299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Headphones",
    rating: 4.7,
    highlights: [
      "Active noise cancellation",
      "30-hour battery life",
      "Premium sound quality",
      "Comfortable memory foam ear cushions",
      "Quick charging capability",
    ],
  },
  {
    id: 2,
    title: 'Ultra HD Smart TV 55"',
    description: "55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps",
    price: 699.99,
    oldPrice: 799.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Televisions",
    rating: 4.5,
    highlights: [
      "4K Ultra HD resolution",
      "HDR support for vibrant colors",
      "Built-in streaming apps",
      "Voice control capability",
      "Slim bezel design",
    ],
  },
  {
    id: 3,
    title: "Professional DSLR Camera",
    description: "24.1 Megapixel DSLR camera with 4K video recording",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cameras",
    rating: 4.8,
    highlights: [
      "24.1 Megapixel sensor",
      "4K video recording",
      "45-point autofocus system",
      "3-inch vari-angle touchscreen",
      "Built-in Wi-Fi and Bluetooth",
    ],
  },
  {
    id: 4,
    title: "Flagship Smartphone",
    description: "Latest flagship smartphone with 6.7-inch OLED display and triple camera system",
    price: 999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smartphones",
    rating: 4.6,
    highlights: [
      "6.7-inch OLED display",
      "Triple camera system",
      "5G connectivity",
      "All-day battery life",
      "Water and dust resistant",
    ],
  },
  {
    id: 5,
    title: "Ultra-thin Laptop",
    description: "13.3-inch ultra-thin laptop with 12-hour battery life",
    price: 1499.99,
    oldPrice: 1699.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Laptops",
    rating: 4.9,
    highlights: [
      "13.3-inch Retina display",
      "12-hour battery life",
      "16GB RAM, 512GB SSD",
      "Backlit keyboard",
      "Fingerprint sensor",
    ],
  },
  {
    id: 6,
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Watches",
    rating: 4.4,
    highlights: [
      "Heart rate monitoring",
      "Built-in GPS",
      "Water resistant to 50m",
      "7-day battery life",
      "Sleep tracking",
    ],
  },
  {
    id: 7,
    title: "Wireless Earbuds",
    description: "True wireless earbuds with noise isolation and touch controls",
    price: 129.99,
    oldPrice: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Headphones",
    rating: 4.3,
    highlights: [
      "True wireless design",
      "Noise isolation",
      "Touch controls",
      "6-hour battery life",
      "Compact charging case",
    ],
  },
  {
    id: 8,
    title: "Gaming Laptop",
    description: "15.6-inch gaming laptop with high-performance graphics",
    price: 1799.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Laptops",
    rating: 4.7,
    highlights: [
      "15.6-inch 144Hz display",
      "NVIDIA RTX graphics",
      "16GB RAM, 1TB SSD",
      "RGB backlit keyboard",
      "Advanced cooling system",
    ],
  },
  {
    id: 9,
    title: "Compact Mirrorless Camera",
    description: "20.3 Megapixel mirrorless camera with 4K video capability",
    price: 899.99,
    oldPrice: 999.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cameras",
    rating: 4.5,
    highlights: [
      "20.3 Megapixel sensor",
      "4K video capability",
      "In-body image stabilization",
      "Tilting touchscreen",
      "Compact and lightweight design",
    ],
  },
  {
    id: 10,
    title: "Budget Smartphone",
    description: "6.5-inch smartphone with quad camera system and large battery",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smartphones",
    rating: 4.2,
    highlights: [
      "6.5-inch HD+ display",
      "Quad camera system",
      "5000mAh battery",
      "Octa-core processor",
      "Expandable storage",
    ],
  },
  {
    id: 11,
    title: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Speakers",
    rating: 4.4,
    highlights: [
      "Voice control capability",
      "360° sound",
      "Smart home integration",
      "Multi-room audio support",
      "Compact design",
    ],
  },
  {
    id: 12,
    title: "4K Action Camera",
    description: "Waterproof 4K action camera with image stabilization",
    price: 349.99,
    oldPrice: 399.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cameras",
    rating: 4.6,
    highlights: [
      "4K video recording",
      "Waterproof to 10m",
      "Advanced image stabilization",
      "Voice control",
      "Wi-Fi and Bluetooth connectivity",
    ],
  },
  {
    id: 13,
    title: "Curved Gaming Monitor",
    description: "34-inch curved gaming monitor with 144Hz refresh rate",
    price: 499.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Monitors",
    rating: 4.7,
    highlights: [
      "34-inch curved display",
      "144Hz refresh rate",
      "1ms response time",
      "AMD FreeSync technology",
      "Adjustable stand",
    ],
  },
  {
    id: 14,
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices",
    price: 29.99,
    oldPrice: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    rating: 4.3,
    highlights: [
      "Fast wireless charging",
      "Qi compatibility",
      "LED charging indicator",
      "Compact design",
      "Non-slip surface",
    ],
  },
  {
    id: 15,
    title: "Smart Doorbell",
    description: "HD video doorbell with motion detection and two-way audio",
    price: 179.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smart Home",
    rating: 4.5,
    highlights: ["HD video quality", "Motion detection", "Two-way audio", "Night vision", "Cloud storage option"],
  },
  {
    id: 16,
    title: "Portable Bluetooth Speaker",
    description: "Waterproof portable Bluetooth speaker with 20-hour battery life",
    price: 79.99,
    oldPrice: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Speakers",
    rating: 4.4,
    highlights: [
      "Waterproof design",
      "20-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Compact and portable",
    ],
  },
]

