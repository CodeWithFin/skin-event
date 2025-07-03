'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase, ChatMessage } from '@/lib/supabase'
import { useLanguage } from './LanguageProvider'

interface Message {
  id: number
  author: string
  message: string
  timestamp: Date
  likes: number
  replies: Reply[]
}

interface Reply {
  id: number
  author: string
  message: string
  timestamp: Date
}

const LiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: 'Sarah M.',
      message: 'This event is absolutely amazing! The makeup demonstrations are so inspiring! ✨',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      likes: 8,
      replies: [
        {
          id: 1,
          author: 'Jessica K.',
          message: 'I totally agree! Learning so much today 💄',
          timestamp: new Date(Date.now() - 240000)
        }
      ]
    },
    {
      id: 2,
      author: 'Maria L.',
      message: 'The skin consultation was so helpful! Found the perfect products for my skin type 🌟',
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      likes: 12,
      replies: []
    },
    {
      id: 3,
      author: 'Admin',
      message: '🎉 Welcome everyone! Don\'t forget to check out the Spin & Win game and our amazing Sip & Shop deals!',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      likes: 15,
      replies: []
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const emojis = ['😀', '😍', '🥰', '😘', '🤩', '✨', '💄', '💅', '🌟', '🎉', '❤️', '💕', '👏', '🙌', '💯']

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return `${Math.floor(diffInMinutes / 60)}h ago`
  }

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      setIsNameSet(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      author: userName,
      message: newMessage.trim(),
      timestamp: new Date(),
      likes: 0,
      replies: []
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleSendReply = (messageId: number) => {
    if (!replyMessage.trim()) return

    const reply: Reply = {
      id: Date.now(),
      author: userName,
      message: replyMessage.trim(),
      timestamp: new Date()
    }

    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, replies: [...msg.replies, reply] }
        : msg
    ))

    setReplyMessage('')
    setReplyingTo(null)
  }

  const likeMessage = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ))
  }

  const addEmoji = (emoji: string) => {
    if (replyingTo) {
      setReplyMessage(replyMessage + emoji)
    } else {
      setNewMessage(newMessage + emoji)
    }
    setShowEmojiPicker(false)
  }

  if (!isNameSet) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="card max-w-md w-full">
          <h2 className="text-2xl font-bold text-brand-brown text-center mb-6">
            💬 Join the Conversation
          </h2>
          <form onSubmit={handleSubmitName}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Enter your name to start chatting
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Start Chatting
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-2">
            💬 Live Chat & Guestbook
          </h1>
          <p className="text-brand-charcoal">
            Share your thoughts and connect with other attendees!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {/* Main Message */}
                <div className={`rounded-lg p-3 ${
                  message.author === 'Admin' 
                    ? 'bg-brand-burgundy text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-semibold text-sm ${
                      message.author === 'Admin' ? 'text-white' : 'text-brand-brown'
                    }`}>
                      {message.author}
                    </span>
                    <span className={`text-xs ${
                      message.author === 'Admin' ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {formatTimeAgo(message.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    message.author === 'Admin' ? 'text-white' : 'text-brand-charcoal'
                  }`}>
                    {message.message}
                  </p>
                  
                  {/* Message Actions */}
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => likeMessage(message.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        message.author === 'Admin' 
                          ? 'text-white/80 hover:text-white' 
                          : 'text-brand-burgundy hover:text-brand-burgundy/80'
                      }`}
                    >
                      ❤️ {message.likes}
                    </button>
                    <button
                      onClick={() => setReplyingTo(message.id)}
                      className={`text-xs transition-colors ${
                        message.author === 'Admin' 
                          ? 'text-white/80 hover:text-white' 
                          : 'text-brand-brown hover:text-brand-brown/80'
                      }`}
                    >
                      💬 Reply
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {message.replies.length > 0 && (
                  <div className="ml-8 space-y-2">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="bg-brand-cream border border-brand-pink rounded-lg p-2">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-xs text-brand-brown">
                            {reply.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-brand-charcoal">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === message.id && (
                  <div className="ml-8">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply(message.id)}
                      />
                      <button
                        onClick={() => handleSendReply(message.id)}
                        className="btn-primary text-sm px-3 py-2"
                      >
                        Send
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="text-gray-500 hover:text-gray-700 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                />
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  😊
                </button>
              </div>
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Guidelines */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-brand-brown mb-3">
            📋 Chat Guidelines
          </h3>
          <div className="text-sm text-brand-charcoal space-y-1">
            <p>• Be respectful and kind to all participants</p>
            <p>• Share your genuine experiences from the event</p>
            <p>• No spam or promotional messages</p>
            <p>• Messages are moderated for safety</p>
            <p>• Have fun and connect with fellow beauty enthusiasts!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveChat
