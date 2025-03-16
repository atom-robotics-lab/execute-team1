import ProductList from "@/components/product-list"
import FeaturedCategories from "@/components/featured-categories"

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">E-Commerce Store</h1>
        <FeaturedCategories />
        <h2 className="text-3xl font-bold mb-8 mt-12">Featured Products</h2>
        <ProductList />
      </div>
    </main>
  )
}

