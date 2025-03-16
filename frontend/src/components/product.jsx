import React from 'react'

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 149.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 2,
      name: "Leather Backpack",
      price: 89.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 4,
      name: "Smart Water Bottle",
      price: 29.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 5,
      name: "Fitness Tracker",
      price: 79.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 6,
      name: "Portable Charger",
      price: 49.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 69.99,
      image: "https://placehold.co/300x300",
    },
    {
      id: 8,
      name: "Sunglasses",
      price: 119.99,
      image: "https://placehold.co/300x300",
    },
  ]
  
  return (
    <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Featured Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="group rounded-lg border p-4 transition-all hover:shadow-md">
                <div className="mb-4 aspect-square overflow-hidden rounded-md">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  <button className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
              View All Products
            </button>
          </div>
        </div>
      </section>
  )
}

export default Product