'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'

interface RegistrationData {
  name: string
  email: string
  phone: string
  interests: string[]
  dietaryRestrictions: string
  hearAboutUs: string
}

const GoogleFormIntegration = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    dietaryRestrictions: '',
    hearAboutUs: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const interestOptions = [
    'Skincare Products',
    'Makeup Classes',
    'Skin Consultations',
    'Beauty Treatments',
    'Korean Beauty Products',
    'Professional Training',
    'Networking'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const generateQRCode = (registrationId: string) => {
    const qrData = {
      id: registrationId,
      name: formData.name,
      email: formData.email,
      event: 'Vitapharm Beauty & Academy Launch',
      date: '2025-07-05',
      checkedIn: false
    }
    return JSON.stringify(qrData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission (in production, this would submit to Google Forms)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const registrationId = `VPH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const qrCodeData = generateQRCode(registrationId)
      
      setQrCode(qrCodeData)
      setIsSubmitted(true)
      
      // In production, you would also:
      // 1. Submit to Google Forms API
      // 2. Save to database
      // 3. Send confirmation email
      
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `vitapharm-event-qr-${formData.name.replace(/\s+/g, '-')}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="card max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-brand-brown mb-4">
            Registration Successful!
          </h2>
          <p className="text-lg text-brand-charcoal mb-6">
            Thank you, <span className="font-semibold text-brand-burgundy">{formData.name}</span>! 
            Your registration for the Vitapharm Beauty & Academy Launch is confirmed.
          </p>

          {/* QR Code */}
          <div className="bg-white p-6 rounded-lg border-2 border-brand-pink mb-6 inline-block">
            <h3 className="text-lg font-semibold text-brand-brown mb-4">
              Your Event QR Code
            </h3>
            <QRCode
              id="qr-code"
              value={qrCode}
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              viewBox="0 0 256 256"
            />
            <p className="text-sm text-brand-charcoal mt-4">
              Present this QR code at the event entrance
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-brand-cream p-6 rounded-lg mb-6 text-left">
            <h4 className="font-semibold text-brand-brown mb-3">Event Instructions:</h4>
            <ul className="space-y-2 text-sm text-brand-charcoal">
              <li>• <strong>Save your QR code</strong> - Screenshot or download it</li>
              <li>• <strong>Arrive 15 minutes early</strong> for check-in</li>
              <li>• <strong>Bring a valid ID</strong> along with your QR code</li>
              <li>• <strong>Event starts at 11:00 AM</strong> on July 5, 2025</li>
              <li>• <strong>Dress code:</strong> Smart casual, comfortable shoes recommended</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadQRCode}
              className="btn-primary flex items-center justify-center gap-2"
            >
              📱 Download QR Code
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              👥 Register Another Person
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-brand-pink/20 rounded-lg">
            <p className="text-sm text-brand-charcoal">
              <strong>Need help?</strong> Contact us at{' '}
              <a href="mailto:events@vitapharm.com" className="text-brand-burgundy hover:underline">
                events@vitapharm.com
              </a>{' '}
              or{' '}
              <a href="tel:+254700000000" className="text-brand-burgundy hover:underline">
                +254 700 000 000
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🎫 Event Registration
          </h1>
          <p className="text-lg text-brand-charcoal">
            Register for the Vitapharm Beauty & Academy Launch - July 5, 2025
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-brand-brown mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                placeholder="+254 700 000 000"
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="text-xl font-semibold text-brand-brown mb-4">Your Interests</h3>
            <p className="text-sm text-brand-charcoal mb-3">Select all that apply:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
                  />
                  <span className="text-sm text-brand-charcoal">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-xl font-semibold text-brand-brown mb-4">Additional Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Dietary Restrictions or Allergies
                </label>
                <textarea
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  placeholder="Please let us know about any dietary restrictions or allergies..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  How did you hear about this event?
                </label>
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                >
                  <option value="">Select an option</option>
                  <option value="social-media">Social Media</option>
                  <option value="word-of-mouth">Word of Mouth</option>
                  <option value="website">Vitapharm Website</option>
                  <option value="email">Email Newsletter</option>
                  <option value="partner">Partner/Sponsor</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm text-brand-charcoal">
                I agree to the{' '}
                <a href="#" className="text-brand-burgundy hover:underline">Terms and Conditions</a>{' '}
                and{' '}
                <a href="#" className="text-brand-burgundy hover:underline">Privacy Policy</a>.
                I consent to receiving event updates and promotional materials from Vitapharm Beauty & Health.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-brand-brown hover:bg-brand-brown/90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Registering...
              </span>
            ) : (
              '🎫 Complete Registration'
            )}
          </button>
        </form>

        {/* Event Details */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">Event Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-brand-charcoal">
            <div>
              <strong>Date:</strong> July 5, 2025<br />
              <strong>Time:</strong> 11:00 AM - 6:00 PM<br />
              <strong>Venue:</strong> Vitapharm Beauty Center
            </div>
            <div>
              <strong>Dress Code:</strong> Smart Casual<br />
              <strong>Parking:</strong> Free on-site parking<br />
              <strong>Contact:</strong> events@vitapharm.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleFormIntegration
