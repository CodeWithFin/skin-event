'use client'

import { useState } from 'react'
import Timetable from '@/components/Timetable'
import PhotoGallery from '@/components/PhotoGallery'
import SipShop from '@/components/SipShop'
import SpinToWin from '@/components/SpinToWin'
import LiveChat from '@/components/LiveChat'
import GoogleFormIntegration from '@/components/GoogleFormIntegration'
import QRCodeScanner from '@/components/QRCodeScanner'
import LivePolls from '@/components/LivePolls'
import EventHighlights from '@/components/EventHighlights'
import Leaderboard from '@/components/Leaderboard'
import MemoryMode from '@/components/MemoryMode'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import { LanguageProvider } from '@/components/LanguageProvider'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

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
      case 'register':
        return <GoogleFormIntegration />
      case 'checkin':
        return <QRCodeScanner />
      case 'polls':
        return <LivePolls />
      case 'highlights':
        return <EventHighlights />
      case 'chat':
        return <LiveChat />
      case 'leaderboard':
        return <Leaderboard />
      case 'memory':
        return <MemoryMode />
      default:
        return <Hero setActiveSection={setActiveSection} />
    }
  }

  return (
    <LanguageProvider>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="min-h-screen bg-brand-cream">
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="pt-16">
            {renderSection()}
          </main>
          <Footer />
        </div>
      )}
    </LanguageProvider>
  )
}
