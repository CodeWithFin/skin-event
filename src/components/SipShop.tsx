'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  category: 'product' | 'course' | 'facial'
  description?: string
  originalPrice?: number
}

const SipShop = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'courses' | 'facials'>('products')
  const [cart, setCart] = useState<Product[]>([])

  const products: Product[] = [
    { id: 1, name: 'All Ciiphura Brand', price: 250, category: 'product' },
    { id: 2, name: 'All Laroche Brands', price: 200, category: 'product' },
    { id: 3, name: 'All Perfumes', price: 400, category: 'product' },
    { id: 4, name: 'All Korean Brands', price: 300, category: 'product' },
    { id: 5, name: 'All Qrx Brands', price: 500, category: 'product' },
    { id: 6, name: 'All Anua Brands', price: 300, category: 'product' },
    { id: 7, name: 'All LA Girl Brands', price: 150, category: 'product' },
    { id: 8, name: 'All Cerave Brands', price: 200, category: 'product' },
    { id: 9, name: 'All Simple Brands', price: 200, category: 'product' },
    { id: 10, name: 'All Black Girl', price: 800, category: 'product' },
  ]

  const courses: Product[] = [
    { id: 11, name: 'Make-up classes', price: 30000, category: 'course', description: 'Professional makeup training' },
    { id: 12, name: 'Personal Make-up (6 days)', price: 7500, category: 'course', description: '6-day intensive personal makeup course' },
    { id: 13, name: 'Skin of color (4 weeks)', price: 50000, category: 'course', description: '4-week comprehensive skin care program' },
  ]

  const facials: Product[] = [
    { id: 14, name: 'Skin consultation', price: 0, category: 'facial', description: 'Free professional skin analysis' },
    { id: 15, name: 'Make-up', price: 1500, category: 'facial', description: 'Professional makeup application' },
    { id: 16, name: 'Timeless', price: 4500, category: 'facial', description: 'Anti-aging facial treatment' },
    { id: 17, name: 'Glow fusion', price: 8000, category: 'facial', description: 'Brightening and hydrating treatment' },
    { id: 18, name: 'Skin Analysis', price: 1000, category: 'facial', description: 'Detailed skin condition assessment' },
    { id: 19, name: 'Deep treatment', price: 10000, category: 'facial', description: 'Intensive deep cleansing treatment' },
    { id: 20, name: 'Acne Treatment (consult + care)', price: 0, category: 'facial', description: '40% off special offer', originalPrice: 15000 },
  ]

  const addToCart = (item: Product) => {
    setCart([...cart, item])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'products':
        return products
      case 'courses':
        return courses
      case 'facials':
        return facials
      default:
        return products
    }
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'FREE' : `KES ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🛍️ Sip & Shop
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Discover amazing beauty products, professional courses, and rejuvenating treatments
          </p>
        </div>

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <div className="card mb-8 bg-brand-pink/20 border-brand-burgundy">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-brand-brown">
                  🛒 Cart ({cart.length} items)
                </h3>
                <p className="text-brand-charcoal">
                  Total: <span className="font-bold text-brand-burgundy">{formatPrice(getTotalPrice())}</span>
                </p>
              </div>
              <button className="btn-primary">
                Checkout
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              💄 Products
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'courses'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              🎓 Courses
            </button>
            <button
              onClick={() => setActiveTab('facials')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'facials'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              ✨ Treatments
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentItems().map((item) => (
            <div key={item.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-brand-brown mb-2">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-brand-charcoal mb-3">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-brand-burgundy">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        KES {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {item.originalPrice && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        40% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-2xl">
                  {activeTab === 'products' && '💄'}
                  {activeTab === 'courses' && '🎓'}
                  {activeTab === 'facials' && '✨'}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="btn-primary flex-1 text-sm"
                >
                  Add to Cart
                </button>
                {item.price === 0 && (
                  <button className="btn-secondary flex-1 text-sm">
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-brand-brown text-center mb-6">
            🎉 Special Event Offers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-r from-brand-pink to-brand-peach">
              <h3 className="text-xl font-semibold text-brand-brown mb-2">
                🎁 Bundle Deal
              </h3>
              <p className="text-brand-charcoal mb-4">
                Buy any 3 beauty products and get 15% off your total purchase!
              </p>
              <button className="btn-primary">
                Shop Bundle
              </button>
            </div>
            <div className="card bg-gradient-to-r from-brand-cream to-brand-pink">
              <h3 className="text-xl font-semibold text-brand-brown mb-2">
                💆‍♀️ Treatment Package
              </h3>
              <p className="text-brand-charcoal mb-4">
                Book any facial treatment today and get a free skin consultation worth KES 1,000!
              </p>
              <button className="btn-secondary">
                Book Treatment
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card mt-8 text-center">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            Need Help with Your Order?
          </h3>
          <p className="text-brand-charcoal mb-4">
            Our beauty consultants are here to help you find the perfect products and treatments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              📞 Call Consultant
            </button>
            <button className="btn-secondary">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SipShop
