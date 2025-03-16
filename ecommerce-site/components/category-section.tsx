"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Smartphone, Laptop, Watch, Headphones, Camera, Tv, Speaker, Package } from "lucide-react"

interface CategorySectionProps {
  categories: string[]
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const [visibleCategories, setVisibleCategories] = useState<string[]>([])

  useEffect(() => {
    // Animate categories appearing one by one
    const timer = setTimeout(() => {
      setVisibleCategories(categories)
    }, 100)

    return () => clearTimeout(timer)
  }, [categories])

  // Map of category names to icons
  const categoryIcons: Record<string, React.ReactNode> = {
    smartphones: <Smartphone className="h-10 w-10 mb-3" />,
    laptops: <Laptop className="h-10 w-10 mb-3" />,
    watches: <Watch className="h-10 w-10 mb-3" />,
    headphones: <Headphones className="h-10 w-10 mb-3" />,
    cameras: <Camera className="h-10 w-10 mb-3" />,
    televisions: <Tv className="h-10 w-10 mb-3" />,
    speakers: <Speaker className="h-10 w-10 mb-3" />,
    accessories: <Package className="h-10 w-10 mb-3" />,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Link
          key={category}
          href={`/category/${category.toLowerCase()}`}
          className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${
            visibleCategories.includes(category) ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="text-blue-600">
            {categoryIcons[category.toLowerCase()] || (
              <div className="h-10 w-10 mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{category.charAt(0)}</span>
              </div>
            )}
          </div>
          <span className="text-base font-medium text-gray-900 capitalize">{category}</span>
          <span className="text-sm text-gray-500 mt-1">Shop Now</span>
        </Link>
      ))}
    </div>
  )
}

