'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration (default 5 seconds)
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
    }
  }

  const getColorForType = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'error':
        return 'bg-red-100 border-red-500 text-red-800'
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-800'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border-l-4 shadow-lg animate-slide-in ${getColorForType(notification.type)}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <span className="text-xl">{getIconForType(notification.type)}</span>
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm mt-1">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
