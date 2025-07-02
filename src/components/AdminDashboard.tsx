'use client'

import { useState } from 'react'

interface AdminStats {
  totalRegistrations: number
  totalPhotos: number
  pendingPhotos: number
  totalMessages: number
  activeUsers: number
}

interface Registration {
  id: number
  name: string
  email: string
  phone: string
  timestamp: Date
  checkedIn: boolean
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'photos' | 'messages' | 'announcements'>('overview')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')

  const stats: AdminStats = {
    totalRegistrations: 127,
    totalPhotos: 43,
    pendingPhotos: 7,
    totalMessages: 89,
    activeUsers: 23
  }

  const registrations: Registration[] = [
    {
      id: 1,
      name: 'Sarah Michelle',
      email: 'sarah@email.com',
      phone: '+254712345678',
      timestamp: new Date(Date.now() - 3600000),
      checkedIn: true
    },
    {
      id: 2,
      name: 'Jessica Kenya',
      email: 'jessica@email.com',
      phone: '+254798765432',
      timestamp: new Date(Date.now() - 7200000),
      checkedIn: false
    }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple admin authentication (in production, this would be more secure)
    if (adminPassword === 'vitapharm2025') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const sendAnnouncement = () => {
    // In a real app, this would send to all connected users
    alert('Announcement sent to all users!')
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'registrations', label: '👥 Registrations', icon: '👥' },
            { id: 'photos', label: '📸 Photo Moderation', icon: '📸' },
            { id: 'messages', label: '💬 Messages', icon: '💬' },
            { id: 'announcements', label: '📢 Announcements', icon: '📢' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-brand-brown mb-2">
                  {stats.totalRegistrations}
                </div>
                <div className="text-sm text-brand-charcoal">Total Registrations</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-brand-burgundy mb-2">
                  {stats.totalPhotos}
                </div>
                <div className="text-sm text-brand-charcoal">Photos Uploaded</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {stats.pendingPhotos}
                </div>
                <div className="text-sm text-brand-charcoal">Pending Approval</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.totalMessages}
                </div>
                <div className="text-sm text-brand-charcoal">Chat Messages</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.activeUsers}
                </div>
                <div className="text-sm text-brand-charcoal">Active Users</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-xl font-semibold text-brand-brown mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-brand-charcoal">New photo uploaded by Sarah M.</span>
                  <span className="text-sm text-gray-500">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-brand-charcoal">Jessica K. registered for the event</span>
                  <span className="text-sm text-gray-500">5 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-brand-charcoal">New message in live chat</span>
                  <span className="text-sm text-gray-500">8 min ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="card">
            <h3 className="text-xl font-semibold text-brand-brown mb-4">
              Event Registrations
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-brand-brown">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-brand-brown">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-brand-brown">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-brand-brown">Registered</th>
                    <th className="text-left py-3 px-4 font-semibold text-brand-brown">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-brand-charcoal">{reg.name}</td>
                      <td className="py-3 px-4 text-brand-charcoal">{reg.email}</td>
                      <td className="py-3 px-4 text-brand-charcoal">{reg.phone}</td>
                      <td className="py-3 px-4 text-brand-charcoal">
                        {reg.timestamp.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.checkedIn 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.checkedIn ? 'Checked In' : 'Registered'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="card">
            <h3 className="text-xl font-semibold text-brand-brown mb-4">
              Send Announcement
            </h3>
            <div className="space-y-4">
              <textarea
                placeholder="Type your announcement here..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
              />
              <button
                onClick={sendAnnouncement}
                className="btn-primary"
              >
                📢 Send to All Users
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
