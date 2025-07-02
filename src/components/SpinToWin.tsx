'use client'

import { useState, useRef } from 'react'

interface Prize {
  id: number
  name: string
  color: string
  probability: number
}

const SpinToWin = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [hasSpunToday, setHasSpunToday] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const prizes: Prize[] = [
    { id: 1, name: '50% OFF Skincare', color: '#8B2C3E', probability: 0.15 },
    { id: 2, name: 'Free Consultation', color: '#6B3F27', probability: 0.25 },
    { id: 3, name: 'Beauty Sample Kit', color: '#F4C2C2', probability: 0.20 },
    { id: 4, name: '20% OFF Makeup', color: '#FFDAB9', probability: 0.15 },
    { id: 5, name: 'Free Mini Facial', color: '#8B2C3E', probability: 0.10 },
    { id: 6, name: 'Product Voucher', color: '#6B3F27', probability: 0.10 },
    { id: 7, name: 'Try Again!', color: '#F4C2C2', probability: 0.05 },
  ]

  const selectPrize = () => {
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (const prize of prizes) {
      cumulativeProbability += prize.probability
      if (random <= cumulativeProbability) {
        return prize
      }
    }
    return prizes[prizes.length - 1] // fallback
  }

  const spinWheel = () => {
    if (isSpinning || hasSpunToday) return

    setIsSpinning(true)
    setWonPrize(null)

    const selectedPrize = selectPrize()
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id)
    const degreesPerSegment = 360 / prizes.length
    const prizeAngle = prizeIndex * degreesPerSegment
    
    // Add multiple rotations + prize angle
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const finalRotation = currentRotation + (spins * 360) + (360 - prizeAngle)
    
    setCurrentRotation(finalRotation)

    // Animate and show result
    setTimeout(() => {
      setIsSpinning(false)
      setWonPrize(selectedPrize)
      setHasSpunToday(true)
    }, 3000)
  }

  const resetSpin = () => {
    setHasSpunToday(false)
    setWonPrize(null)
    setCurrentRotation(0)
  }

  const handleRegistration = () => {
    setShowRegistrationForm(true)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🎮 Spin to Win!
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Try your luck and win amazing beauty prizes! Register or scan your QR code to spin.
          </p>
        </div>

        {/* Registration Required */}
        {!showRegistrationForm && (
          <div className="card mb-8 bg-brand-pink/20">
            <h3 className="text-xl font-semibold text-brand-brown mb-4">
              🎫 Registration Required
            </h3>
            <p className="text-brand-charcoal mb-4">
              Complete your registration or scan your QR code to unlock the spin wheel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRegistration}
                className="btn-primary"
              >
                📝 Register Now
              </button>
              <button className="btn-secondary">
                📱 Scan QR Code
              </button>
            </div>
          </div>
        )}

        {showRegistrationForm && (
          <>
            {/* Spin Wheel */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Wheel */}
                <div
                  ref={wheelRef}
                  className="w-80 h-80 rounded-full border-8 border-brand-brown shadow-2xl relative overflow-hidden transition-transform duration-3000 ease-out"
                  style={{
                    transform: `rotate(${currentRotation}deg)`,
                    transitionDuration: isSpinning ? '3s' : '0s'
                  }}
                >
                  {prizes.map((prize, index) => {
                    const angle = (360 / prizes.length) * index
                    const nextAngle = (360 / prizes.length) * (index + 1)
                    
                    return (
                      <div
                        key={prize.id}
                        className="absolute w-full h-full"
                        style={{
                          background: `conic-gradient(from ${angle}deg, ${prize.color} 0deg, ${prize.color} ${360/prizes.length}deg, transparent ${360/prizes.length}deg)`,
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                        }}
                      >
                        <div
                          className="absolute text-white font-bold text-sm transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${50 + 35 * Math.cos((angle + 360/prizes.length/2 - 90) * Math.PI / 180)}%`,
                            top: `${50 + 35 * Math.sin((angle + 360/prizes.length/2 - 90) * Math.PI / 180)}%`,
                            transform: `translate(-50%, -50%) rotate(${angle + 360/prizes.length/2}deg)`,
                            writingMode: 'vertical-lr',
                            textOrientation: 'mixed'
                          }}
                        >
                          {prize.name}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Center button */}
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpunToday}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg font-bold text-white transition-all duration-200 ${
                    isSpinning || hasSpunToday
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-brand-burgundy hover:bg-brand-burgundy/90 hover:scale-110 cursor-pointer'
                  }`}
                >
                  {isSpinning ? (
                    <div className="animate-spin">⚡</div>
                  ) : hasSpunToday ? (
                    '✓'
                  ) : (
                    'SPIN'
                  )}
                </button>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-brand-brown"></div>
                </div>
              </div>
            </div>

            {/* Spin Status */}
            <div className="mb-8">
              {isSpinning && (
                <div className="card bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin text-2xl">🎰</div>
                    <span className="text-lg font-semibold text-blue-700">
                      Spinning... Good luck!
                    </span>
                  </div>
                </div>
              )}

              {wonPrize && (
                <div className="card bg-green-50 border-green-200">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    🎉 Congratulations!
                  </h3>
                  <p className="text-lg text-green-600 mb-4">
                    You won: <span className="font-bold">{wonPrize.name}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary">
                      📱 Claim Prize
                    </button>
                    <button
                      onClick={resetSpin}
                      className="btn-secondary"
                    >
                      🔄 Try Tomorrow
                    </button>
                  </div>
                </div>
              )}

              {hasSpunToday && !wonPrize && (
                <div className="card bg-yellow-50 border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                    ⏰ Come Back Tomorrow!
                  </h3>
                  <p className="text-yellow-600 mb-4">
                    You've already spun today. Come back tomorrow for another chance to win!
                  </p>
                  <button
                    onClick={resetSpin}
                    className="btn-secondary"
                  >
                    🔄 Reset (Demo)
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Prize Information */}
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            🏆 Available Prizes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prizes.filter(p => p.name !== 'Try Again!').map((prize) => (
              <div key={prize.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-brand-charcoal">{prize.name}</span>
                <span className="text-sm text-brand-burgundy font-semibold">
                  {Math.round(prize.probability * 100)}% chance
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            📋 Game Rules
          </h3>
          <div className="text-left max-w-2xl mx-auto space-y-2 text-brand-charcoal">
            <p>• One spin per person per day</p>
            <p>• Must be registered or have a valid QR code</p>
            <p>• Prizes must be claimed at the event</p>
            <p>• Some prizes may have limited availability</p>
            <p>• Event organizers reserve the right to modify prizes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinToWin
