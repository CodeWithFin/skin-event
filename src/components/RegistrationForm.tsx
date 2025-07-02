'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  interests: string[]
  dietary: string
  marketing: boolean
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    dietary: '',
    marketing: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const interestOptions = [
    'Skincare Consultation',
    'Makeup Classes',
    'Product Shopping',
    'Facial Treatments',
    'Beauty Courses',
    'Networking'
  ]

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      // Generate a simple QR code (in production, this would be generated server-side)
      setQrCode(`VB2025-${Date.now().toString().slice(-6)}`)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-brand-brown mb-4">
            Registration Successful!
          </h2>
          <p className="text-brand-charcoal mb-6">
            Thank you for registering for the Vitapharm Beauty & Academy Launch event!
          </p>
          
          {/* QR Code */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
            <div className="text-4xl mb-2">📱</div>
            <div className="text-lg font-semibold text-brand-brown mb-2">Your QR Code</div>
            <div className="text-2xl font-mono text-brand-burgundy mb-2">{qrCode}</div>
            <p className="text-sm text-gray-600">
              Save this code for event check-in and prize draws
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-brand-charcoal">
              <strong>Event Details:</strong><br />
              📅 July 5, 2025<br />
              ⏰ 11:00 AM - 6:00 PM<br />
              📍 Vitapharm Beauty & Academy
            </div>
            
            <button
              onClick={() => window.print()}
              className="btn-primary w-full"
            >
              🖨️ Print QR Code
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary w-full"
            >
              🏠 Back to Event Hub
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🎫 Event Registration
          </h1>
          <p className="text-lg text-brand-charcoal">
            Register for the Vitapharm Beauty & Academy Launch Event
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-brown">Personal Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-brown">What interests you most?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-4 h-4 text-brand-brown rounded focus:ring-2 focus:ring-brand-brown"
                    />
                    <span className="text-brand-charcoal">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dietary Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-brown">Dietary Requirements</h3>
              <textarea
                value={formData.dietary}
                onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                rows={3}
                placeholder="Any dietary restrictions or special requirements?"
              />
            </div>

            {/* Marketing Consent */}
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.marketing}
                  onChange={(e) => setFormData({...formData, marketing: e.target.checked})}
                  className="w-4 h-4 text-brand-brown rounded focus:ring-2 focus:ring-brand-brown mt-1"
                />
                <span className="text-sm text-brand-charcoal">
                  I agree to receive marketing communications from Vitapharm Beauty & Health about future events, products, and services.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary text-lg py-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Registering...
                </div>
              ) : (
                '🎫 Register for Event'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
