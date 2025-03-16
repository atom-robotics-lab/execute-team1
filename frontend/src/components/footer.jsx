import React from 'react'
import { Link } from 'react-router-dom'
import {  X, Facebook, Twitter, Instagram, Github } from "lucide-react"
const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">ShopNow</h3>
              <p className="text-sm text-gray-600">
                Your one-stop shop for premium products designed for modern living.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/category/electronics" className="text-gray-600 hover:text-gray-900">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="/category/fashion" className="text-gray-600 hover:text-gray-900">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/category/home" className="text-gray-600 hover:text-gray-900">
                    Home & Living
                  </Link>
                </li>
                <li>
                  <Link to="/category/beauty" className="text-gray-600 hover:text-gray-900">
                    Beauty & Health
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Stay Connected</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h4>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full rounded-md border border-gray-300 px-3 py-1 max-w-[220px]"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer