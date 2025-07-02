'use client'

import { useState } from 'react'
import Timetable from '@/components/Timetable'
import PhotoGallery from '@/components/PhotoGallery'
import SipShop from '@/components/SipShop'
import SpinToWin from '@/components/SpinToWin'
import LiveChat from '@/components/LiveChat'
import SponsorZone from '@/components/SponsorZone'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />
      case 'timetable':
        return <Timetable />
      case 'gallery':
        return <PhotoGallery />
      case 'shop':
        return <SipShop />
      case 'games':
        return <SpinToWin />
      case 'chat':
        return <LiveChat />
      case 'sponsors':
        return <SponsorZone />
      default:
        return <Hero />
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  )
}
