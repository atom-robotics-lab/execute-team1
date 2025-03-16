import { products } from "@/data/products"
import ProductCard from "@/components/product-card"
import CategorySection from "@/components/category-section"
import Header from "@/components/header"
import FeaturedProduct from "@/components/featured-product"

export default function Home() {
  // Get unique categories
  const categories = [...new Set(products.map((product) => product.category))]

  // Get a featured product
  const featuredProduct = products.find((p) => p.id === 1) || products[0]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      
      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of products across popular categories
            </p>
          </div>
          <CategorySection categories={categories} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular items loved by customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The latest additions to our collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(8, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-2">Subscribe to our newsletter for exclusive deals and updates</p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-medium transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

