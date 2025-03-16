"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { Button, Input, Card } from "@/components/ui-components"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [promoCode, setPromoCode] = useState("")

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 mx-auto mb-6 text-gray-400"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-100 font-medium">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="border-t first:border-t-0">
                <div className="grid md:grid-cols-5 gap-4 p-4 items-center">
                  <div className="md:col-span-2 flex gap-4 items-center">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedColor && item.selectedSize && <span> / </span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 flex items-center text-sm text-red-500 hover:text-red-700 md:hidden"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Price</div>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Quantity</div>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                        disabled={item.quantity <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="M5 12h14"/>
                        </svg>
                        <span className="sr-only">Decrease quantity</span>
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="M5 12h14"/>
                          <path d="M12 5v14"/>
                        </svg>
                        <span className="sr-only">Increase quantity</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Total</div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="hidden md:inline-flex mt-2 items-center text-sm text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round\" <path d="M3 6h18"/>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      <span className="ml-1">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
          
          <div className="flex justify-between mt-6">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <Card className="p-6 space-y-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <hr className="my-2" />
            
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="pt-4">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                />
                <Button variant="outline">Apply</Button>
              </div>
              
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

