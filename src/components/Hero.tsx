'use client'

import { useLanguage } from './LanguageProvider'

interface HeroProps {
  setActiveSection?: (section: string) => void
}

const Hero = ({ setActiveSection }: HeroProps) => {
  const { t } = useLanguage()
  
  return (
    <div className="relative min-h-screen gradient-bg flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-brand-brown rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-brand-burgundy rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-brand-brown rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 border-2 border-brand-burgundy rounded-full"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-brand-brown mb-6">
          {t('hero.title')}
          <span className="block text-brand-burgundy">{t('hero.subtitle')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-brand-charcoal mb-8 font-medium">
          {t('hero.description')}
        </p>

        {/* Event Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-lg font-semibold text-brand-brown mb-1">Date</h3>
              <p className="text-brand-charcoal">July 5, 2025</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="text-lg font-semibold text-brand-brown mb-1">Time</h3>
              <p className="text-brand-charcoal">11:00 AM - 6:00 PM</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-lg font-semibold text-brand-brown mb-1">Experience</h3>
              <p className="text-brand-charcoal">Beauty, Learning & Fun</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="btn-primary text-lg px-8 py-3"
            onClick={() => setActiveSection?.('register')}
          >
            🎫 Register Now
          </button>
          <button 
            className="btn-secondary text-lg px-8 py-3"
            onClick={() => setActiveSection?.('timetable')}
          >
            📋 View Schedule
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-brown">7+</div>
            <div className="text-sm text-brand-charcoal">Activities</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-brown">10+</div>
            <div className="text-sm text-brand-charcoal">Brands</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-brown">3</div>
            <div className="text-sm text-brand-charcoal">Courses</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-brown">6+</div>
            <div className="text-sm text-brand-charcoal">Treatments</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
