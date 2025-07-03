'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Memory {
  id: string
  type: 'photo' | 'video' | 'message' | 'highlight'
  title: string
  content: string
  image_url?: string
  video_url?: string
  author: string
  likes: number
  created_at: string
}

const MemoryMode = () => {
  const [activeTab, setActiveTab] = useState<'recap' | 'gallery' | 'messages' | 'feedback'>('recap')
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = async () => {
    try {
      // In real implementation, fetch from Supabase
      setMemories(mockMemories)
    } catch (error) {
      console.error('Error fetching memories:', error)
      setMemories(mockMemories)
    } finally {
      setLoading(false)
    }
  }

  const mockMemories: Memory[] = [
    {
      id: '1',
      type: 'highlight',
      title: 'Event Opening',
      content: 'The grand opening of Vitapharm Beauty & Academy Launch was a spectacular success!',
      image_url: '/api/placeholder/400/300',
      author: 'Event Team',
      likes: 45,
      created_at: '2025-07-05T11:30:00Z'
    },
    {
      id: '2',
      type: 'photo',
      title: 'Panel Discussion Highlights',
      content: 'Amazing insights from our "Glow Up or Shut Up" panel discussion',
      image_url: '/api/placeholder/400/300',
      author: 'Grace Beauty',
      likes: 32,
      created_at: '2025-07-05T12:45:00Z'
    },
    {
      id: '3',
      type: 'video',
      title: 'Cake Cutting Celebration',
      content: 'The magical moment of our celebration cake cutting ceremony',
      video_url: '#',
      author: 'Event Team',
      likes: 67,
      created_at: '2025-07-05T17:45:00Z'
    },
    {
      id: '4',
      type: 'message',
      title: 'Thank You Note',
      content: 'What an incredible day! The energy, the learning, the connections - everything was perfect. Thank you Vitapharm for this amazing experience!',
      author: 'Amara Williams',
      likes: 28,
      created_at: '2025-07-05T18:00:00Z'
    }
  ]

  const submitMessage = async () => {
    if (!newMessage.trim()) return

    const newMemory: Memory = {
      id: Date.now().toString(),
      type: 'message',
      title: 'Memory Shared',
      content: newMessage,
      author: 'Anonymous', // In real app, get from user session
      likes: 0,
      created_at: new Date().toISOString()
    }

    setMemories([newMemory, ...memories])
    setNewMessage('')
  }

  const submitFeedback = () => {
    // In real implementation, submit to backend
    setFeedbackSubmitted(true)
  }

  const getEventStats = () => {
    const totalPhotos = memories.filter(m => m.type === 'photo').length + 150
    const totalAttendees = 200
    const totalMemories = memories.length + 89
    
    return { totalPhotos, totalAttendees, totalMemories }
  }

  const stats = getEventStats()

  const renderRecap = () => (
    <div className="space-y-8">
      {/* Event Summary */}
      <div className="card bg-gradient-to-r from-brand-pink to-brand-peach">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-brown mb-4">
            🎉 Vitapharm Beauty & Academy Launch - A Huge Success!
          </h2>
          <p className="text-brand-charcoal mb-6">
            July 5, 2025 • 11:00 AM - 6:00 PM • Nairobi, Kenya
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-3xl font-bold text-brand-burgundy">{stats.totalAttendees}</div>
              <div className="text-sm text-brand-charcoal">Amazing Attendees</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-3xl font-bold text-brand-burgundy">{stats.totalPhotos}</div>
              <div className="text-sm text-brand-charcoal">Beautiful Photos</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-3xl font-bold text-brand-burgundy">{stats.totalMemories}</div>
              <div className="text-sm text-brand-charcoal">Precious Memories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline of Events */}
      <div className="card">
        <h3 className="text-xl font-semibold text-brand-brown mb-6 text-center">
          📅 Event Timeline Recap
        </h3>
        <div className="space-y-4">
          {[
            { time: '11:00 AM', event: 'Red Carpet & Guest Arrival', emoji: '🌟' },
            { time: '11:30 AM', event: 'Opening Remarks & Ribbon Cutting', emoji: '✂️' },
            { time: '12:15 PM', event: 'Panel Discussion: "Glow Up or Shut Up"', emoji: '💬' },
            { time: '1:00 PM', event: 'Sip, Shop & Skin Consultations', emoji: '🛍️' },
            { time: '2:30 PM', event: 'Panel Discussion: "The Real Glow Code"', emoji: '✨' },
            { time: '3:15 PM', event: 'Sip & Shop Marathon + Fun Stations', emoji: '🎮' },
            { time: '5:30 PM', event: 'Raffle Draw & Celebration', emoji: '🎉' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{item.emoji}</div>
              <div className="flex-grow">
                <div className="font-semibold text-brand-brown">{item.time}</div>
                <div className="text-brand-charcoal">{item.event}</div>
              </div>
              <div className="text-green-500 text-xl">✅</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderGallery = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-brand-brown mb-2">
          📸 Event Photo Highlights
        </h3>
        <p className="text-brand-charcoal">Relive the beautiful moments from our launch event</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.filter(m => m.type === 'photo' || m.image_url).map((memory) => (
          <div key={memory.id} className="card hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img 
                src={memory.image_url} 
                alt={memory.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="font-semibold text-brand-brown mb-2">{memory.title}</h4>
            <p className="text-sm text-brand-charcoal mb-3">{memory.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {memory.author}</span>
              <span>❤️ {memory.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-brand-cream to-white">
        <h3 className="text-xl font-semibold text-brand-brown mb-4">
          💝 Share Your Memory
        </h3>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="What was your favorite moment from the event? Share your thoughts, photos, or experiences..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown resize-none"
          rows={4}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={submitMessage}
            disabled={!newMessage.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share Memory
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {memories.filter(m => m.type === 'message').map((memory) => (
          <div key={memory.id} className="card bg-gradient-to-r from-pink-50 to-white">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-brand-brown">{memory.author}</h4>
              <span className="text-sm text-gray-500">
                {new Date(memory.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-brand-charcoal mb-3">{memory.content}</p>
            <div className="flex justify-between items-center">
              <button className="text-sm text-brand-burgundy hover:text-brand-brown">
                ❤️ {memory.likes} likes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFeedback = () => (
    <div className="max-w-2xl mx-auto">
      {feedbackSubmitted ? (
        <div className="card text-center bg-gradient-to-r from-green-50 to-green-100">
          <div className="text-6xl mb-4">🙏</div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Thank You for Your Feedback!
          </h3>
          <p className="text-green-700">
            Your insights help us create even better events in the future.
          </p>
        </div>
      ) : (
        <div className="card">
          <h3 className="text-2xl font-bold text-brand-brown mb-6 text-center">
            📝 Event Feedback
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-2">
                How would you rate the overall event? ⭐
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-3xl hover:scale-110 transition-transform">
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-2">
                What was your favorite part of the event?
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown">
                <option>Panel Discussions</option>
                <option>Sip & Shop Experience</option>
                <option>Product Consultations</option>
                <option>Networking Opportunities</option>
                <option>Prize Activities</option>
                <option>Photo Opportunities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-2">
                Any suggestions for future events?
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                rows={4}
                placeholder="We'd love to hear your thoughts..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-brown mb-2">
                Would you attend future Vitapharm events?
              </label>
              <div className="space-y-2">
                {['Absolutely! 😍', 'Probably 😊', 'Maybe 🤔', 'Unlikely 😕'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input type="radio" name="future" className="mr-2" />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={submitFeedback}
              className="w-full btn-primary py-3"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            💝 Event Memories
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Relive the magic of the Vitapharm Beauty & Academy Launch
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-white rounded-lg p-1 shadow-md min-w-max">
            {[
              { id: 'recap', label: 'Event Recap', icon: '📊' },
              { id: 'gallery', label: 'Photo Gallery', icon: '📸' },
              { id: 'messages', label: 'Memory Wall', icon: '💌' },
              { id: 'feedback', label: 'Feedback', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'recap' | 'gallery' | 'messages' | 'feedback')}
                className={`px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brand-brown text-white shadow-md'
                    : 'text-brand-brown hover:bg-brand-pink/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-pulse">💝</div>
            <p className="text-brand-charcoal">Loading memories...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'recap' && renderRecap()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'feedback' && renderFeedback()}
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoryMode
