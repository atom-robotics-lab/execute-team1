import React from 'react'

const Herosection = () => {
  return (
    <section className="bg-gray-100 py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Shop the Latest Trends</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Discover our curated collection of premium products designed for modern living.
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 text-sm font-medium">
              Shop Now
            </button>
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

  )
}

export default Herosection