'use client'

import { useState } from 'react'
import { useLanguage, LanguageSelector } from './LanguageProvider'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', category: 'main' },
    { id: 'timetable', label: 'Schedule', icon: '⏰', category: 'main' },
    { id: 'register', label: 'Register', icon: '�', category: 'main' },
    { id: 'checkin', label: 'Check-In', icon: '�', category: 'main' },
    { id: 'shop', label: 'Sip & Shop', icon: '🛍️', category: 'shop' },
    { id: 'gallery', label: 'Gallery', icon: '�', category: 'social' },
    { id: 'chat', label: 'Live Chat', icon: '�', category: 'social' },
    { id: 'polls', label: 'Polls', icon: '📊', category: 'social' },
    { id: 'highlights', label: 'News', icon: '📰', category: 'social' },
    { id: 'games', label: 'Spin & Win', icon: '🎮', category: 'fun' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆', category: 'fun' },
    { id: 'memory', label: 'Memories', icon: '💝', category: 'fun' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-brand-brown">
              Vitapharm Beauty & Academy
            </div>
            <LanguageSelector />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'bg-brand-brown text-white'
                    : 'text-brand-charcoal hover:bg-brand-pink hover:text-brand-brown'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Tablet Navigation - Icons Only */}
          <div className="hidden md:flex lg:hidden space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`p-2 rounded-md text-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-brand-brown text-white'
                    : 'text-brand-charcoal hover:bg-brand-pink hover:text-brand-brown'
                }`}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-brown hover:text-brand-burgundy p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 flex items-center gap-3 ${
                    activeSection === item.id
                      ? 'bg-brand-brown text-white'
                      : 'text-brand-charcoal hover:bg-brand-pink hover:text-brand-brown'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
