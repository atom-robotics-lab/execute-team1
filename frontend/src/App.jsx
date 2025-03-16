
import { useState } from "react"
import { Link } from "react-router-dom"
import {  X, Facebook, Twitter, Instagram, Github } from "lucide-react"
import Navbar from "./components/navbar"
import Herosection from "./components/herosection"
import Product from "./components/product"
import Features from "./components/features"
import Footer from "./components/footer"

export default function EcommerceHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
          <div className="flex justify-end">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <Link to="/" className="text-lg font-semibold">
              Home
            </Link>
            <Link to="/products" className="text-lg font-semibold">
              Products
            </Link>
            <Link to="/cart" className="text-lg font-semibold">
              Cart
            </Link>
            <Link to="/profile" className="text-lg font-semibold">
              Profile
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar/>
      {/* Hero Section */}
      <Herosection/>

      {/* Product Grid */}
      <Product/>
      {/* Features Section */}
      <Features/>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

