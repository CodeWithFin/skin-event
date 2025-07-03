'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'sw'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.schedule': 'Schedule',
    'nav.register': 'Register',
    'nav.checkin': 'Check-In',
    'nav.shop': 'Sip & Shop',
    'nav.gallery': 'Gallery',
    'nav.chat': 'Live Chat',
    'nav.polls': 'Polls',
    'nav.news': 'News',
    'nav.games': 'Spin & Win',
    'nav.leaderboard': 'Leaderboard',
    'nav.memory': 'Memories',

    // Hero Section
    'hero.title': 'Vitapharm Beauty',
    'hero.subtitle': '& Academy Launch',
    'hero.description': 'Join us for an unforgettable beauty experience',
    'hero.date': 'Date',
    'hero.time': 'Time',
    'hero.experience': 'Experience',
    'hero.register': 'Register Now',
    'hero.schedule': 'View Schedule',

    // Common
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',

    // Event specific
    'event.date': 'July 5, 2025',
    'event.time': '11:00 AM - 6:00 PM',
    'event.experience': 'Beauty, Learning & Fun',
    'event.location': 'Nairobi, Kenya',
    'event.entry': 'Free Entry',

    // Shop
    'shop.title': 'Sip & Shop',
    'shop.products': 'Products',
    'shop.courses': 'Courses',
    'shop.treatments': 'Treatments',
    'shop.addToCart': 'Add to Cart',
    'shop.bookNow': 'Book Now',

    // Chat
    'chat.title': 'Live Chat',
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',

    // Polls
    'polls.title': 'Live Polls',
    'polls.vote': 'Vote',
    'polls.results': 'Results',

    // Leaderboard
    'leaderboard.title': 'Event Leaderboard',
    'leaderboard.overall': 'Overall',
    'leaderboard.photos': 'Photos',
    'leaderboard.engagement': 'Engagement',

    // Memory
    'memory.title': 'Event Memories',
    'memory.recap': 'Event Recap',
    'memory.gallery': 'Photo Gallery',
    'memory.messages': 'Memory Wall',
    'memory.feedback': 'Feedback'
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.schedule': 'Ratiba',
    'nav.register': 'Jisajili',
    'nav.checkin': 'Ingia',
    'nav.shop': 'Nunua',
    'nav.gallery': 'Picha',
    'nav.chat': 'Mazungumzo',
    'nav.polls': 'Kura',
    'nav.news': 'Habari',
    'nav.games': 'Mchezo',
    'nav.leaderboard': 'Uongozi',
    'nav.memory': 'Kumbukumbu',

    // Hero Section
    'hero.title': 'Vitapharm Beauty',
    'hero.subtitle': '& Academy Launch',
    'hero.description': 'Jiunge nasi kwa uzoefu wa urembo usiosahaulika',
    'hero.date': 'Tarehe',
    'hero.time': 'Muda',
    'hero.experience': 'Uzoefu',
    'hero.register': 'Jisajili Sasa',
    'hero.schedule': 'Ona Ratiba',

    // Common
    'common.loading': 'Inapakia...',
    'common.submit': 'Wasilisha',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.edit': 'Hariri',
    'common.delete': 'Futa',
    'common.close': 'Funga',
    'common.back': 'Rudi',
    'common.next': 'Ifuatayo',
    'common.previous': 'Iliyotangulia',

    // Event specific
    'event.date': 'Julai 5, 2025',
    'event.time': '11:00 AM - 6:00 PM',
    'event.experience': 'Urembo, Kujifunza & Furaha',
    'event.location': 'Nairobi, Kenya',
    'event.entry': 'Uingiaji wa Bure',

    // Shop
    'shop.title': 'Nunua na Kunywa',
    'shop.products': 'Bidhaa',
    'shop.courses': 'Kozi',
    'shop.treatments': 'Matibabu',
    'shop.addToCart': 'Ongeza Kwenye Kikapu',
    'shop.bookNow': 'Agiza Sasa',

    // Chat
    'chat.title': 'Mazungumzo ya Moja kwa Moja',
    'chat.placeholder': 'Andika ujumbe wako...',
    'chat.send': 'Tuma',

    // Polls
    'polls.title': 'Kura za Moja kwa Moja',
    'polls.vote': 'Piga Kura',
    'polls.results': 'Matokeo',

    // Leaderboard
    'leaderboard.title': 'Jedwali la Uongozi',
    'leaderboard.overall': 'Jumla',
    'leaderboard.photos': 'Picha',
    'leaderboard.engagement': 'Ushiriki',

    // Memory
    'memory.title': 'Kumbukumbu za Tukio',
    'memory.recap': 'Muhtasari wa Tukio',
    'memory.gallery': 'Ukumbi wa Picha',
    'memory.messages': 'Ukuta wa Kumbukumbu',
    'memory.feedback': 'Maoni'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-brand-brown text-white'
            : 'text-brand-brown hover:bg-brand-pink/50'
        }`}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => setLanguage('sw')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'sw'
            ? 'bg-brand-brown text-white'
            : 'text-brand-brown hover:bg-brand-pink/50'
        }`}
      >
        🇰🇪 SW
      </button>
    </div>
  )
}
