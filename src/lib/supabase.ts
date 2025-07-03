import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Registration {
  id: string
  name: string
  email: string
  phone: string
  organization?: string
  interests: string[]
  qr_code: string
  checked_in: boolean
  created_at: string
}

export interface Photo {
  id: string
  url: string
  title?: string
  uploaded_by: string
  likes: number
  created_at: string
  approved: boolean
}

export interface ChatMessage {
  id: string
  user_name: string
  message: string
  emoji_reaction?: string
  created_at: string
}

export interface Poll {
  id: string
  question: string
  options: string[]
  votes: { [key: string]: number }
  active: boolean
  created_at: string
}

export interface Highlight {
  id: string
  type: 'announcement' | 'photo' | 'video' | 'shoutout'
  title: string
  content: string
  image_url?: string
  created_at: string
}

export interface LeaderboardEntry {
  id: string
  user_name: string
  points: number
  photos_uploaded: number
  polls_participated: number
  chat_messages: number
}
