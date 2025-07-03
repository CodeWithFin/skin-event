'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    const loadingMessages = [
      'Preparing your beauty experience...',
      'Loading product catalog...',
      'Setting up event schedule...',
      'Connecting live features...',
      'Almost ready...',
    ]
    
    let currentMessageIndex = 0
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        // Update loading message based on progress
        const messageIndex = Math.floor(newProgress / 20)
        if (messageIndex < loadingMessages.length && messageIndex !== currentMessageIndex) {
          setLoadingText(loadingMessages[messageIndex])
          currentMessageIndex = messageIndex
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-brand-cream via-brand-pink to-brand-peach flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-brand-brown/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-brand-burgundy/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-brand-brown/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-brand-burgundy/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-pulse">✨</div>
          <h1 className="text-3xl font-bold text-brand-brown mb-2">
            Vitapharm Beauty
          </h1>
          <p className="text-brand-burgundy font-semibold">
            & Academy Launch
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-brand-burgundy to-brand-brown h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-brand-charcoal mt-2">
            <span>{progress}%</span>
            <span>July 5, 2025</span>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-brand-charcoal text-lg font-medium animate-pulse">
          {loadingText}
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-brand-burgundy rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
