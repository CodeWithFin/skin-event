'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  id: number
  time: string
  activity: string
  startTime: Date
  endTime: Date
}

const Timetable = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Event date: July 5, 2025
  const eventDate = new Date('2025-07-05')
  
  const timeSlots: TimeSlot[] = [
    {
      id: 1,
      time: '11:00AM–11:30AM',
      activity: 'Red Carpet & Guest Arrival',
      startTime: new Date(eventDate.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
      endTime: new Date(eventDate.getTime() + 11.5 * 60 * 60 * 1000), // 11:30 AM
    },
    {
      id: 2,
      time: '11:30AM–12:15PM',
      activity: 'Opening Remarks & Ribbon Cutting',
      startTime: new Date(eventDate.getTime() + 11.5 * 60 * 60 * 1000), // 11:30 AM
      endTime: new Date(eventDate.getTime() + 12.25 * 60 * 60 * 1000), // 12:15 PM
    },
    {
      id: 3,
      time: '12:15PM–1:00PM',
      activity: 'Panel Discussion #1: "Glow Up or Shut Up"',
      startTime: new Date(eventDate.getTime() + 12.25 * 60 * 60 * 1000), // 12:15 PM
      endTime: new Date(eventDate.getTime() + 13 * 60 * 60 * 1000), // 1:00 PM
    },
    {
      id: 4,
      time: '1:00PM–2:30PM',
      activity: 'Sip, Shop & Skin Consultations #1',
      startTime: new Date(eventDate.getTime() + 13 * 60 * 60 * 1000), // 1:00 PM
      endTime: new Date(eventDate.getTime() + 14.5 * 60 * 60 * 1000), // 2:30 PM
    },
    {
      id: 5,
      time: '2:30PM–3:15PM',
      activity: 'Panel Discussion #2: "The Real Glow Code"',
      startTime: new Date(eventDate.getTime() + 14.5 * 60 * 60 * 1000), // 2:30 PM
      endTime: new Date(eventDate.getTime() + 15.25 * 60 * 60 * 1000), // 3:15 PM
    },
    {
      id: 6,
      time: '3:15PM–5:30PM',
      activity: 'Sip & Shop Marathon + Fun Stations #2',
      startTime: new Date(eventDate.getTime() + 15.25 * 60 * 60 * 1000), // 3:15 PM
      endTime: new Date(eventDate.getTime() + 17.5 * 60 * 60 * 1000), // 5:30 PM
    },
    {
      id: 7,
      time: '5:30PM–6:00PM',
      activity: 'Raffle Draw, Group Photo, Cake Cutting & Toast',
      startTime: new Date(eventDate.getTime() + 17.5 * 60 * 60 * 1000), // 5:30 PM
      endTime: new Date(eventDate.getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
    },
  ]

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get current session
  const getCurrentSession = () => {
    return timeSlots.find(slot => 
      currentTime >= slot.startTime && currentTime <= slot.endTime
    )
  }

  // Get next session
  const getNextSession = () => {
    return timeSlots.find(slot => currentTime < slot.startTime)
  }

  // Get time until next session
  const getTimeUntilNext = () => {
    const nextSession = getNextSession()
    if (!nextSession) return null

    const diff = nextSession.startTime.getTime() - currentTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const currentSession = getCurrentSession()
  const nextSession = getNextSession()
  const timeUntilNext = getTimeUntilNext()

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-brand-cream overflow-y-auto' : 'min-h-screen'} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown">
            📅 Event Schedule
          </h1>
          <button
            onClick={toggleFullscreen}
            className="btn-primary flex items-center gap-2"
          >
            {isFullscreen ? '🔽 Exit Fullscreen' : '🔼 Fullscreen'}
          </button>
        </div>

        {/* Current Status */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Session */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-brown mb-2">
                🎯 Current Session
              </h3>
              {currentSession ? (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                  <div className="text-sm text-green-700 font-medium mb-1">
                    {currentSession.time}
                  </div>
                  <div className="text-green-800 font-semibold">
                    {currentSession.activity}
                  </div>
                  <div className="flex justify-center mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 italic">No active session</div>
              )}
            </div>

            {/* Next Session Countdown */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-brown mb-2">
                ⏳ Next Session
              </h3>
              {nextSession && timeUntilNext ? (
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                  <div className="text-sm text-blue-700 font-medium mb-1">
                    {nextSession.time}
                  </div>
                  <div className="text-blue-800 font-semibold mb-2">
                    {nextSession.activity}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {String(timeUntilNext.hours).padStart(2, '0')}:
                    {String(timeUntilNext.minutes).padStart(2, '0')}:
                    {String(timeUntilNext.seconds).padStart(2, '0')}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 italic">All sessions completed</div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-brown mb-6 text-center">
            Full Event Timeline
          </h3>
          <div className="space-y-4">
            {timeSlots.map((slot, index) => {
              const isCurrent = currentSession?.id === slot.id
              const isPast = currentTime > slot.endTime
              const isUpcoming = currentTime < slot.startTime

              return (
                <div
                  key={slot.id}
                  className={`flex items-center p-4 rounded-lg border-l-4 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-green-50 border-green-500 shadow-lg scale-105'
                      : isPast
                      ? 'bg-gray-50 border-gray-300 opacity-70'
                      : 'bg-white border-brand-pink hover:bg-brand-pink/10'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        isCurrent
                          ? 'bg-green-500 animate-blink'
                          : isPast
                          ? 'bg-gray-400'
                          : 'bg-brand-burgundy'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div
                          className={`font-semibold text-lg ${
                            isCurrent ? 'text-green-700' : 'text-brand-brown'
                          }`}
                        >
                          {slot.activity}
                        </div>
                        <div
                          className={`text-sm ${
                            isCurrent ? 'text-green-600' : 'text-brand-charcoal'
                          }`}
                        >
                          {slot.time}
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        {isCurrent && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            🔴 Live Now
                          </span>
                        )}
                        {isPast && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            ✅ Completed
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ⏰ Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timetable
