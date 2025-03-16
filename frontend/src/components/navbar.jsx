import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShoppingCart, Search, User } from 'lucide-react'
const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4 md:gap-8">
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-500 hover:text-gray-700 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <ShoppingCart className="h-6 w-6" />
          <span>ShopNow</span>
        </Link>
      </div>
      <div className="hidden flex-1 md:flex md:justify-center">
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium">
            Products
          </Link>
          <Link to="/cart" className="text-sm font-medium">
            Cart
          </Link>
          <Link to="/profile" className="text-sm font-medium">
            Profile
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <form className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-md border border-gray-300 pl-8 py-1 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
            3
          </span>
          <span className="sr-only">Cart</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </button>
      </div>
    </div>
  </header>
  )
}

export default Navbar