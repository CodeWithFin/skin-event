'use client'

import { useState, useEffect } from 'react'
import { supabase, LeaderboardEntry } from '@/lib/supabase'

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'overall' | 'photos' | 'engagement'>('overall')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('leaderboard')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'leaderboard' },
        () => fetchLeaderboard()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('points', { ascending: false })
        .limit(20)

      if (error) {
        console.error('Error fetching leaderboard:', error)
        // Use mock data for demo
        setLeaderboard(mockLeaderboard)
      } else {
        setLeaderboard(data || mockLeaderboard)
      }
    } catch (error) {
      console.error('Error:', error)
      setLeaderboard(mockLeaderboard)
    } finally {
      setLoading(false)
    }
  }

  const mockLeaderboard: LeaderboardEntry[] = [
    { id: '1', user_name: 'Amara Beauty', points: 450, photos_uploaded: 8, polls_participated: 12, chat_messages: 25 },
    { id: '2', user_name: 'Grace Makeover', points: 380, photos_uploaded: 6, polls_participated: 10, chat_messages: 18 },
    { id: '3', user_name: 'Zara Glam', points: 320, photos_uploaded: 5, polls_participated: 8, chat_messages: 22 },
    { id: '4', user_name: 'Beauty Queen', points: 290, photos_uploaded: 4, polls_participated: 9, chat_messages: 15 },
    { id: '5', user_name: 'Glow Goddess', points: 260, photos_uploaded: 3, polls_participated: 7, chat_messages: 20 },
    { id: '6', user_name: 'Skin Expert', points: 240, photos_uploaded: 4, polls_participated: 6, chat_messages: 12 },
    { id: '7', user_name: 'Makeup Artist', points: 220, photos_uploaded: 2, polls_participated: 8, chat_messages: 16 },
    { id: '8', user_name: 'Beauty Blogger', points: 200, photos_uploaded: 3, polls_participated: 5, chat_messages: 14 },
    { id: '9', user_name: 'Glam Squad', points: 180, photos_uploaded: 2, polls_participated: 6, chat_messages: 10 },
    { id: '10', user_name: 'Style Icon', points: 160, photos_uploaded: 1, polls_participated: 4, chat_messages: 12 },
  ]

  const getFilteredLeaderboard = () => {
    switch (activeTab) {
      case 'photos':
        return [...leaderboard].sort((a, b) => b.photos_uploaded - a.photos_uploaded)
      case 'engagement':
        return [...leaderboard].sort((a, b) => (b.polls_participated + b.chat_messages) - (a.polls_participated + a.chat_messages))
      default:
        return leaderboard
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return `#${index + 1}`
    }
  }

  const getPointsColor = (points: number) => {
    if (points >= 400) return 'text-yellow-600'
    if (points >= 300) return 'text-gray-500'
    if (points >= 200) return 'text-amber-600'
    return 'text-gray-700'
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🏆 Event Leaderboard
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            See who&apos;s making the most of the Vitapharm Beauty & Academy Launch!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center bg-gradient-to-r from-yellow-50 to-yellow-100">
            <div className="text-3xl mb-2">👑</div>
            <h3 className="text-lg font-semibold text-brand-brown mb-1">Top Contributor</h3>
            <p className="text-brand-charcoal">
              {leaderboard[0]?.user_name || 'Loading...'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {leaderboard[0]?.points || 0} points
            </p>
          </div>
          <div className="card text-center bg-gradient-to-r from-pink-50 to-pink-100">
            <div className="text-3xl mb-2">📸</div>
            <h3 className="text-lg font-semibold text-brand-brown mb-1">Photo Star</h3>
            <p className="text-brand-charcoal">
              {[...leaderboard].sort((a, b) => b.photos_uploaded - a.photos_uploaded)[0]?.user_name || 'Loading...'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {[...leaderboard].sort((a, b) => b.photos_uploaded - a.photos_uploaded)[0]?.photos_uploaded || 0} photos
            </p>
          </div>
          <div className="card text-center bg-gradient-to-r from-purple-50 to-purple-100">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-lg font-semibold text-brand-brown mb-1">Social Butterfly</h3>
            <p className="text-brand-charcoal">
              {[...leaderboard].sort((a, b) => b.chat_messages - a.chat_messages)[0]?.user_name || 'Loading...'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {[...leaderboard].sort((a, b) => b.chat_messages - a.chat_messages)[0]?.chat_messages || 0} messages
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('overall')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'overall'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              🏆 Overall
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'photos'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              📸 Photos
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'engagement'
                  ? 'bg-brand-brown text-white shadow-md'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              🎯 Engagement
            </button>
          </div>
        </div>

        {/* Leaderboard List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <p className="text-brand-charcoal">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredLeaderboard().map((user, index) => (
              <div 
                key={user.id} 
                className={`card hover:shadow-lg transition-all duration-300 ${
                  index < 3 ? 'border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-white' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold w-12 text-center">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-brown">
                        {user.user_name}
                      </h3>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>📸 {user.photos_uploaded}</span>
                        <span>📊 {user.polls_participated}</span>
                        <span>💬 {user.chat_messages}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getPointsColor(user.points)}`}>
                      {user.points}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* How Points Work */}
        <div className="card mt-8 bg-gradient-to-r from-brand-cream to-brand-pink">
          <h3 className="text-xl font-semibold text-brand-brown mb-4 text-center">
            🎯 How to Earn Points
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-brand-brown mb-2">Photo Activities</h4>
              <ul className="space-y-1 text-brand-charcoal">
                <li>📸 Upload a photo: <span className="font-semibold">+20 points</span></li>
                <li>❤️ Photo gets liked: <span className="font-semibold">+5 points each</span></li>
                <li>🌟 Photo featured: <span className="font-semibold">+50 points</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-brown mb-2">Engagement Activities</h4>
              <ul className="space-y-1 text-brand-charcoal">
                <li>📊 Vote in poll: <span className="font-semibold">+10 points</span></li>
                <li>💬 Send chat message: <span className="font-semibold">+5 points</span></li>
                <li>🎮 Play Spin & Win: <span className="font-semibold">+15 points</span></li>
                <li>📝 Register for event: <span className="font-semibold">+30 points</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
