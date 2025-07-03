'use client'

import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  type: 'announcement' | 'highlight' | 'shoutout' | 'update'
  title: string
  content: string
  timestamp: Date
  author?: string
  media?: {
    type: 'image' | 'video'
    url: string
    thumbnail?: string
  }
  priority: 'low' | 'medium' | 'high'
  isLive?: boolean
}

const EventHighlights = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: 1,
      type: 'announcement',
      title: '🎉 Welcome to Vitapharm Beauty & Academy Launch!',
      content: 'Thank you all for joining us today! Get ready for an amazing day of beauty, learning, and networking. Don\'t forget to visit our Sip & Shop area for exclusive deals!',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      author: 'Event Team',
      priority: 'high',
      isLive: true
    },
    {
      id: 2,
      type: 'highlight',
      title: '✨ Ribbon Cutting Ceremony Complete!',
      content: 'What an incredible start to our event! The ribbon cutting ceremony was beautiful, and we\'re officially open for an amazing day of beauty education and shopping.',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      author: 'Sarah Johnson, Event Coordinator',
      media: {
        type: 'image',
        url: '/api/placeholder/600/400',
        thumbnail: '/api/placeholder/300/200'
      },
      priority: 'high'
    },
    {
      id: 3,
      type: 'shoutout',
      title: '👏 Shoutout to Our Amazing Sponsors!',
      content: 'Special thanks to La Roche-Posay, CeraVe, and all our incredible sponsors making this event possible. Check out their exclusive offers in the Sponsor Zone!',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      author: 'Marketing Team',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'update',
      title: '🍽️ Refreshments Now Available',
      content: 'Light refreshments and beverages are now being served near the main stage. Enjoy some snacks while you explore our beauty stations!',
      timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
      priority: 'low'
    },
    {
      id: 5,
      type: 'highlight',
      title: '🎯 Panel Discussion Highlights',
      content: 'Amazing insights from our "Glow Up or Shut Up" panel! Key takeaways: consistency is key, know your skin type, and don\'t be afraid to experiment with new looks.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      author: 'Beauty Expert Panel',
      media: {
        type: 'video',
        url: '/api/placeholder/video',
        thumbnail: '/api/placeholder/600/400'
      },
      priority: 'high'
    }
  ])

  const [filter, setFilter] = useState<'all' | 'announcement' | 'highlight' | 'shoutout' | 'update'>('all')
  const [newItemAnimation, setNewItemAnimation] = useState<number | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUpdates = [
        {
          type: 'update' as const,
          title: '📸 Photo Contest Update',
          content: 'We\'ve received over 50 amazing photos already! Keep sharing your beautiful moments using our gallery feature.',
          author: 'Photo Team'
        },
        {
          type: 'shoutout' as const,
          title: '🌟 Attendee Spotlight',
          content: 'Amazing transformation by Maria L.! Check out her before and after photos in our gallery - absolutely stunning work!',
          author: 'Beauty Team'
        },
        {
          type: 'announcement' as const,
          title: '⏰ Session Reminder',
          content: 'Panel Discussion #2 "The Real Glow Code" starts in 15 minutes at the main stage. Don\'t miss these expert insights!',
          author: 'Event Team'
        }
      ]

      // Randomly add new item every 30 seconds
      if (Math.random() > 0.5) {
        const randomUpdate = randomUpdates[Math.floor(Math.random() * randomUpdates.length)]
        const newItem: NewsItem = {
          id: Date.now(),
          ...randomUpdate,
          content: randomUpdate.content,
          timestamp: new Date(),
          priority: 'medium' as const,
          isLive: randomUpdate.type === 'announcement'
        }

        setNewsItems(prev => [newItem, ...prev])
        setNewItemAnimation(newItem.id)
        
        // Remove animation after 3 seconds
        setTimeout(() => setNewItemAnimation(null), 3000)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredItems = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.type === filter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return '📢'
      case 'highlight': return '✨'
      case 'shoutout': return '👏'
      case 'update': return '📰'
      default: return '📝'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'highlight': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'shoutout': return 'bg-green-100 text-green-800 border-green-200'
      case 'update': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500'
      case 'medium': return 'border-l-4 border-l-yellow-500'
      case 'low': return 'border-l-4 border-l-green-500'
      default: return ''
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            📰 Event Highlights & News
          </h1>
          <p className="text-lg text-brand-charcoal">
            Stay updated with live announcements, highlights, and special moments
          </p>
        </div>

        {/* Live Status */}
        <div className="card mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-blink"></div>
            <span className="text-red-700 font-semibold">🔴 LIVE UPDATES</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-blink"></div>
          </div>
          <p className="text-center text-red-600 text-sm mt-2">
            Real-time news and announcements from the event
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: '📋 All Updates', count: newsItems.length },
            { id: 'announcement', label: '📢 Announcements', count: newsItems.filter(i => i.type === 'announcement').length },
            { id: 'highlight', label: '✨ Highlights', count: newsItems.filter(i => i.type === 'highlight').length },
            { id: 'shoutout', label: '👏 Shoutouts', count: newsItems.filter(i => i.type === 'shoutout').length },
            { id: 'update', label: '📰 Updates', count: newsItems.filter(i => i.type === 'update').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'announcement' | 'highlight' | 'shoutout' | 'update')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'bg-white text-brand-brown border border-gray-200 hover:bg-brand-pink/20'
              }`}
            >
              {tab.label}
              <span className="bg-black/20 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`card hover:shadow-lg transition-all duration-300 ${getPriorityBorder(item.priority)} ${
                newItemAnimation === item.id ? 'animate-pulse border-brand-burgundy' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getTypeColor(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      {item.isLive && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                          LIVE
                        </span>
                      )}
                      {item.priority === 'high' && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-brand-brown">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{formatTimeAgo(item.timestamp)}</div>
                  {item.author && (
                    <div className="text-xs">by {item.author}</div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-brand-charcoal leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Media */}
              {item.media && (
                <div className="mb-4">
                  {item.media.type === 'image' ? (
                    <img
                      src={item.media.url}
                      alt="Event highlight"
                      className="w-full rounded-lg max-h-64 object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={item.media.thumbnail}
                        alt="Video thumbnail"
                        className="w-full rounded-lg max-h-64 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white/90 rounded-full p-4 hover:bg-white transition-all duration-200">
                          <div className="w-0 h-0 border-l-8 border-l-brand-brown border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-brand-burgundy hover:text-brand-burgundy/80 transition-colors">
                    ❤️ Like
                  </button>
                  <button className="flex items-center gap-1 text-brand-burgundy hover:text-brand-burgundy/80 transition-colors">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-1 text-brand-burgundy hover:text-brand-burgundy/80 transition-colors">
                    📤 Share
                  </button>
                </div>
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  🔗 Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-brand-brown mb-2">
              No {filter} items yet
            </h3>
            <p className="text-brand-charcoal">
              Check back soon for more updates!
            </p>
          </div>
        )}

        {/* Notification Settings */}
        <div className="card mt-8 bg-brand-cream/50">
          <h3 className="text-lg font-semibold text-brand-brown mb-4">
            🔔 Notification Preferences
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm text-brand-charcoal">Important announcements</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm text-brand-charcoal">Event highlights</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm text-brand-charcoal">Shoutouts & mentions</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm text-brand-charcoal">General updates</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHighlights
