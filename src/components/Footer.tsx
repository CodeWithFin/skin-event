'use client'

const Footer = () => {
  return (
    <footer className="bg-brand-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Vitapharm Beauty & Academy</h3>
            <p className="text-brand-cream/80 mb-4">
              Your premier destination for beauty products, professional courses, and skincare treatments.
            </p>
            <div className="flex space-x-4">
              <button className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-brand-brown">
                📘
              </button>
              <button className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-brand-brown">
                📷
              </button>
              <button className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-brand-brown">
                🐦
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-brand-cream/80">
              <li><button className="hover:text-white transition-colors">About Us</button></li>
              <li><button className="hover:text-white transition-colors">Our Courses</button></li>
              <li><button className="hover:text-white transition-colors">Beauty Products</button></li>
              <li><button className="hover:text-white transition-colors">Facial Treatments</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Event Details</h4>
            <div className="space-y-2 text-brand-cream/80">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>July 5, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span>11:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎫</span>
                <span>Free Entry</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-brand-cream/80">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>info@vitapharm.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+254 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span>
                <span>WhatsApp Support</span>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-md text-brand-charcoal text-sm"
                />
                <button className="bg-brand-burgundy hover:bg-brand-burgundy/80 px-4 py-2 rounded-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-cream/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-cream/60 text-sm">
            © 2025 Vitapharm Beauty & Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-brand-cream/60 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
