'use client'

import { useState, useEffect } from 'react'

interface AdminStats {
  totalRegistrations: number
  checkedInAttendees: number
  totalPhotos: number
  pendingPhotos: number
  totalMessages: number
  activePolls: number
  totalReactions: number
}

interface Registration {
  id: string
  name: string
  email: string
  phone: string
  checkedIn: boolean
  checkInTime?: string
  interests: string[]
}

interface PhotoSubmission {
  id: number
  fileName: string
  uploader: string
  timestamp: Date
  status: 'pending' | 'approved' | 'rejected'
  caption: string
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'photos' | 'polls' | 'announcements'>('overview')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [announcementType, setAnnouncementType] = useState<'announcement' | 'highlight' | 'update'>('announcement')

  const [stats, setStats] = useState<AdminStats>({
    totalRegistrations: 287,
    checkedInAttendees: 142,
    totalPhotos: 89,
    pendingPhotos: 12,
    totalMessages: 156,
    activePolls: 2,
    totalReactions: 1420
  })

  const [registrations] = useState<Registration[]>([
    {
      id: 'VPH-1234567890',
      name: 'Sarah Michelle',
      email: 'sarah@email.com',
      phone: '+254712345678',
      checkedIn: true,
      checkInTime: '11:15 AM',
      interests: ['Skincare Products', 'Makeup Classes']
    },
    {
      id: 'VPH-1234567891',
      name: 'Jessica Kenya',
      email: 'jessica@email.com',
      phone: '+254798765432',
      checkedIn: false,
      interests: ['Beauty Treatments', 'Korean Beauty Products']
    },
    {
      id: 'VPH-1234567892',
      name: 'Maria Lopez',
      email: 'maria@email.com',
      phone: '+254700123456',
      checkedIn: true,
      checkInTime: '11:32 AM',
      interests: ['Professional Training', 'Networking']
    }
  ])

  const [photoSubmissions, setPhotoSubmissions] = useState<PhotoSubmission[]>([
    {
      id: 1,
      fileName: 'makeup-transformation.jpg',
      uploader: 'Sarah M.',
      timestamp: new Date(Date.now() - 300000),
      status: 'pending',
      caption: 'Amazing makeup transformation!'
    },
    {
      id: 2,
      fileName: 'skincare-routine.jpg',
      uploader: 'Jessica K.',
      timestamp: new Date(Date.now() - 600000),
      status: 'pending',
      caption: 'My new skincare routine'
    },
    {
      id: 3,
      fileName: 'event-selfie.jpg',
      uploader: 'Maria L.',
      timestamp: new Date(Date.now() - 900000),
      status: 'approved',
      caption: 'Having a blast at the event!'
    }
  ])

  // Real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        checkedInAttendees: prevStats.checkedInAttendees + Math.floor(Math.random() * 3),
        totalMessages: prevStats.totalMessages + Math.floor(Math.random() * 2),
        totalReactions: prevStats.totalReactions + Math.floor(Math.random() * 5)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'vitapharm2025') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const handlePhotoModeration = (photoId: number, status: 'approved' | 'rejected') => {
    setPhotoSubmissions(prev =>
      prev.map(photo =>
        photo.id === photoId ? { ...photo, status } : photo
      )
    )
    
    setStats(prev => ({
      ...prev,
      pendingPhotos: prev.pendingPhotos - 1,
      totalPhotos: status === 'approved' ? prev.totalPhotos + 1 : prev.totalPhotos
    }))
  }

  const sendAnnouncement = () => {
    if (!newAnnouncement.trim()) return

    // In production, this would send to all connected users
    const announcement = {
      type: announcementType,
      content: newAnnouncement,
      timestamp: new Date(),
      author: 'Admin'
    }

    console.log('Sending announcement:', announcement)
    alert(`${announcementType.charAt(0).toUpperCase() + announcementType.slice(1)} sent to all users!`)
    setNewAnnouncement('')
  }

  const exportData = (type: 'registrations' | 'photos' | 'analytics') => {
    let csvContent = ''
    let filename = ''

    switch (type) {
      case 'registrations':
        csvContent = [
          ['ID', 'Name', 'Email', 'Phone', 'Checked In', 'Check-in Time', 'Interests'],
          ...registrations.map(reg => [
            reg.id,
            reg.name,
            reg.email,
            reg.phone,
            reg.checkedIn ? 'Yes' : 'No',
            reg.checkInTime || 'N/A',
            reg.interests.join('; ')
          ])
        ].map(row => row.join(',')).join('\n')
        filename = 'registrations.csv'
        break

      case 'photos':
        csvContent = [
          ['ID', 'Filename', 'Uploader', 'Status', 'Caption', 'Timestamp'],
          ...photoSubmissions.map(photo => [
            photo.id,
            photo.fileName,
            photo.uploader,
            photo.status,
            photo.caption,
            photo.timestamp.toISOString()
          ])
        ].map(row => row.join(',')).join('\n')
        filename = 'photo-submissions.csv'
        break

      case 'analytics':
        csvContent = [
          ['Metric', 'Value'],
          ['Total Registrations', stats.totalRegistrations],
          ['Checked-in Attendees', stats.checkedInAttendees],
          ['Total Photos', stats.totalPhotos],
          ['Pending Photos', stats.pendingPhotos],
          ['Total Messages', stats.totalMessages],
          ['Active Polls', stats.activePolls],
          ['Total Reactions', stats.totalReactions]
        ].map(row => row.join(',')).join('\n')
        filename = 'event-analytics.csv'
        break
    }

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="card max-w-md w-full">
          <h2 className="text-2xl font-bold text-brand-brown text-center mb-6">
            🔐 Admin Access
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Demo password: vitapharm2025</p>
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown">
            ⚙️ Admin Dashboard
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Real-time Status */}
        <div className="card mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
            <span className="text-green-700 font-semibold">🟢 SYSTEM LIVE</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
          </div>
          <p className="text-center text-green-600 text-sm mt-2">
            Real-time monitoring and management active
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'registrations', label: '👥 Registrations', icon: '👥' },
            { id: 'photos', label: '📸 Photo Moderation', icon: '📸' },
            { id: 'polls', label: '🗳️ Polls & Reactions', icon: '🗳️' },
            { id: 'announcements', label: '📢 Announcements', icon: '📢' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'registrations' | 'photos' | 'polls' | 'announcements')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand-brown text-white'
                  : 'bg-white text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand-brown mb-1">{stats.totalRegistrations}</div>
                <div className="text-xs text-brand-charcoal">Total Registrations</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{stats.checkedInAttendees}</div>
                <div className="text-xs text-brand-charcoal">Checked In</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalPhotos}</div>
                <div className="text-xs text-brand-charcoal">Approved Photos</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.pendingPhotos}</div>
                <div className="text-xs text-brand-charcoal">Pending Photos</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalMessages}</div>
                <div className="text-xs text-brand-charcoal">Chat Messages</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand-burgundy mb-1">{stats.activePolls}</div>
                <div className="text-xs text-brand-charcoal">Active Polls</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">{stats.totalReactions}</div>
                <div className="text-xs text-brand-charcoal">Total Reactions</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => exportData('registrations')}
                className="card hover:shadow-lg transition-shadow text-center p-6"
              >
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-brand-brown mb-1">Export Registrations</h3>
                <p className="text-sm text-brand-charcoal">Download attendee data</p>
              </button>
              
              <button
                onClick={() => exportData('photos')}
                className="card hover:shadow-lg transition-shadow text-center p-6"
              >
                <div className="text-3xl mb-2">📸</div>
                <h3 className="font-semibold text-brand-brown mb-1">Export Photos</h3>
                <p className="text-sm text-brand-charcoal">Download photo submissions</p>
              </button>
              
              <button
                onClick={() => exportData('analytics')}
                className="card hover:shadow-lg transition-shadow text-center p-6"
              >
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-brand-brown mb-1">Export Analytics</h3>
                <p className="text-sm text-brand-charcoal">Download event metrics</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-brand-brown">Registration Management</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => exportData('registrations')}
                  className="btn-secondary text-sm"
                >
                  💾 Export CSV
                </button>
              </div>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-brand-brown">Name</th>
                    <th className="text-left p-3 font-semibold text-brand-brown">Email</th>
                    <th className="text-left p-3 font-semibold text-brand-brown">Phone</th>
                    <th className="text-left p-3 font-semibold text-brand-brown">Status</th>
                    <th className="text-left p-3 font-semibold text-brand-brown">Check-in Time</th>
                    <th className="text-left p-3 font-semibold text-brand-brown">Interests</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">{reg.name}</td>
                      <td className="p-3">{reg.email}</td>
                      <td className="p-3">{reg.phone}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          reg.checkedIn 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.checkedIn ? '✅ Checked In' : '⏳ Registered'}
                        </span>
                      </td>
                      <td className="p-3">{reg.checkInTime || 'Not checked in'}</td>
                      <td className="p-3">
                        <div className="text-xs">
                          {reg.interests.slice(0, 2).map((interest, i) => (
                            <span key={i} className="inline-block bg-brand-pink/20 text-brand-brown px-2 py-1 rounded mr-1 mb-1">
                              {interest}
                            </span>
                          ))}
                          {reg.interests.length > 2 && (
                            <span className="text-gray-500">+{reg.interests.length - 2} more</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-brand-brown">Photo Moderation</h2>
              <div className="text-sm text-brand-charcoal">
                {photoSubmissions.filter(p => p.status === 'pending').length} pending approval
              </div>
            </div>

            <div className="grid gap-4">
              {photoSubmissions.filter(photo => photo.status === 'pending').map((photo) => (
                <div key={photo.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-brand-brown">{photo.fileName}</h3>
                      <p className="text-sm text-brand-charcoal">
                        Uploaded by {photo.uploader} • {photo.timestamp.toLocaleString()}
                      </p>
                      <p className="text-sm text-brand-charcoal mt-1">
                        <strong>Caption:</strong> {photo.caption}
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Pending Review
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePhotoModeration(photo.id, 'approved')}
                      className="btn-primary flex items-center gap-2"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handlePhotoModeration(photo.id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}

              {photoSubmissions.filter(p => p.status === 'pending').length === 0 && (
                <div className="card text-center py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <h3 className="text-lg font-semibold text-brand-brown mb-2">All photos reviewed!</h3>
                  <p className="text-brand-charcoal">No pending photo submissions at this time.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-brand-brown">Send Announcements</h2>
            
            <div className="card">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Announcement Type
                  </label>
                  <select
                    value={announcementType}
                    onChange={(e) => setAnnouncementType(e.target.value as 'announcement' | 'highlight' | 'update')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  >
                    <option value="announcement">📢 Important Announcement</option>
                    <option value="highlight">✨ Event Highlight</option>
                    <option value="update">📰 General Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Message Content
                  </label>
                  <textarea
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                    placeholder="Enter your announcement message..."
                  />
                </div>

                <button
                  onClick={sendAnnouncement}
                  disabled={!newAnnouncement.trim()}
                  className={`btn-primary ${!newAnnouncement.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  📢 Send to All Users
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Broadcasting Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Announcements are sent to all active users immediately</li>
                <li>• Keep messages concise and relevant to the event</li>
                <li>• Use appropriate announcement types for better organization</li>
                <li>• Avoid sending too many announcements in a short period</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
