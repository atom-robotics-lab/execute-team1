import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui-components"

const categories = [
  {
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    href: "/category/electronics",
  },
  {
    name: "Clothing",
    image: "/placeholder.svg?height=200&width=200",
    href: "/category/clothing",
  },
  {
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=200&width=200",
    href: "/category/home-kitchen",
  },
  {
    name: "Beauty",
    image: "/placeholder.svg?height=200&width=200",
    href: "/category/beauty",
  },
]

export default function FeaturedCategories() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-40 w-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

