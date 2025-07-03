'use client'

import { useState, useEffect } from 'react'

interface Poll {
  id: number
  question: string
  type: 'single' | 'multiple'
  options: PollOption[]
  isActive: boolean
  endTime?: Date
  totalVotes: number
  session?: string
}

interface PollOption {
  id: number
  text: string
  votes: number
  percentage: number
}

interface Reaction {
  emoji: string
  count: number
  label: string
}

const LivePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: "What's your biggest beauty challenge?",
      type: 'single',
      options: [
        { id: 1, text: 'Finding the right skincare routine', votes: 45, percentage: 35 },
        { id: 2, text: 'Makeup application techniques', votes: 32, percentage: 25 },
        { id: 3, text: 'Product selection for my skin type', votes: 38, percentage: 30 },
        { id: 4, text: 'Budget-friendly quality products', votes: 13, percentage: 10 },
      ],
      isActive: true,
      totalVotes: 128,
      session: 'Panel Discussion #1'
    },
    {
      id: 2,
      question: 'Which treatments interest you most? (Select all)',
      type: 'multiple',
      options: [
        { id: 1, text: 'Anti-aging facials', votes: 67, percentage: 45 },
        { id: 2, text: 'Acne treatment', votes: 89, percentage: 60 },
        { id: 3, text: 'Skin brightening', votes: 92, percentage: 62 },
        { id: 4, text: 'Hydrating treatments', votes: 78, percentage: 52 },
      ],
      isActive: false,
      totalVotes: 148,
      session: 'Skin Consultations'
    }
  ])

  const [sessionReactions, setSessionReactions] = useState<Reaction[]>([
    { emoji: '😍', count: 127, label: 'Love it' },
    { emoji: '🤩', count: 89, label: 'Amazing' },
    { emoji: '👏', count: 156, label: 'Applause' },
    { emoji: '💯', count: 67, label: 'Perfect' },
    { emoji: '🔥', count: 203, label: 'Fire' },
    { emoji: '✨', count: 134, label: 'Sparkle' }
  ])

  const [selectedAnswers, setSelectedAnswers] = useState<{[pollId: number]: number[]}>({})
  const [hasVoted, setHasVoted] = useState<{[pollId: number]: boolean}>({})
  const [currentSession] = useState('Panel Discussion #1: "Glow Up or Shut Up"')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPolls(prevPolls => 
        prevPolls.map(poll => ({
          ...poll,
          options: poll.options.map(option => ({
            ...option,
            votes: option.votes + Math.floor(Math.random() * 3),
          })),
          totalVotes: poll.totalVotes + Math.floor(Math.random() * 5)
        })).map(poll => ({
          ...poll,
          options: poll.options.map(option => ({
            ...option,
            percentage: Math.round((option.votes / poll.totalVotes) * 100)
          }))
        }))
      )

      setSessionReactions(prevReactions =>
        prevReactions.map(reaction => ({
          ...reaction,
          count: reaction.count + Math.floor(Math.random() * 2)
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handlePollVote = (pollId: number, optionId: number) => {
    const poll = polls.find(p => p.id === pollId)
    if (!poll || hasVoted[pollId]) return

    if (poll.type === 'single') {
      setSelectedAnswers(prev => ({ ...prev, [pollId]: [optionId] }))
    } else {
      setSelectedAnswers(prev => {
        const current = prev[pollId] || []
        const newAnswers = current.includes(optionId)
          ? current.filter(id => id !== optionId)
          : [...current, optionId]
        return { ...prev, [pollId]: newAnswers }
      })
    }
  }

  const submitVote = (pollId: number) => {
    const answers = selectedAnswers[pollId] || []
    if (answers.length === 0) return

    // Update poll votes
    setPolls(prevPolls =>
      prevPolls.map(poll =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map(option =>
                answers.includes(option.id)
                  ? { ...option, votes: option.votes + 1 }
                  : option
              ),
              totalVotes: poll.totalVotes + 1
            }
          : poll
      )
    )

    setHasVoted(prev => ({ ...prev, [pollId]: true }))
  }

  const addReaction = (emoji: string) => {
    setSessionReactions(prevReactions =>
      prevReactions.map(reaction =>
        reaction.emoji === emoji
          ? { ...reaction, count: reaction.count + 1 }
          : reaction
      )
    )
  }

  const activePoll = polls.find(poll => poll.isActive)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🗳️ Live Polls & Reactions
          </h1>
          <p className="text-lg text-brand-charcoal">
            Share your thoughts and see real-time audience feedback
          </p>
        </div>

        {/* Current Session */}
        <div className="card mb-8 bg-gradient-to-r from-brand-pink to-brand-peach">
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-brown mb-2">
              🎯 Current Session
            </h2>
            <p className="text-brand-charcoal font-medium">{currentSession}</p>
            <div className="flex justify-center mt-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
            </div>
          </div>
        </div>

        {/* Live Reactions */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            💫 Session Reactions
          </h3>
          <p className="text-sm text-brand-charcoal mb-4">
            React to what&apos;s happening right now!
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {sessionReactions.map((reaction) => (
              <button
                key={reaction.emoji}
                onClick={() => addReaction(reaction.emoji)}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-brand-pink hover:bg-brand-pink/10 transition-all duration-200 group"
              >
                <span className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-200">
                  {reaction.emoji}
                </span>
                <span className="text-xs text-brand-charcoal mb-1">{reaction.label}</span>
                <span className="text-sm font-bold text-brand-burgundy">{reaction.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Poll */}
        {activePoll && (
          <div className="card mb-8 border-2 border-brand-burgundy">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-blink"></div>
              <h3 className="text-xl font-semibold text-brand-brown">
                🔴 Live Poll
              </h3>
            </div>

            <h4 className="text-lg font-medium text-brand-charcoal mb-4">
              {activePoll.question}
            </h4>

            <div className="space-y-3 mb-6">
              {activePoll.options.map((option) => (
                <div key={option.id} className="relative">
                  <button
                    onClick={() => handlePollVote(activePoll.id, option.id)}
                    disabled={hasVoted[activePoll.id]}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedAnswers[activePoll.id]?.includes(option.id)
                        ? 'border-brand-burgundy bg-brand-burgundy/10'
                        : hasVoted[activePoll.id]
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-brand-pink hover:bg-brand-pink/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-brand-charcoal">
                        {option.text}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-brand-burgundy font-bold">
                          {option.percentage}%
                        </span>
                        <span className="text-xs text-gray-500">
                          ({option.votes} votes)
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-burgundy h-full transition-all duration-500 ease-out"
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Total votes: <span className="font-semibold">{activePoll.totalVotes}</span>
                {activePoll.type === 'multiple' && ' • Multiple choice allowed'}
              </div>
              
              {!hasVoted[activePoll.id] && (
                <button
                  onClick={() => submitVote(activePoll.id)}
                  disabled={!selectedAnswers[activePoll.id]?.length}
                  className={`btn-primary ${
                    !selectedAnswers[activePoll.id]?.length ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  🗳️ Submit Vote
                </button>
              )}
              
              {hasVoted[activePoll.id] && (
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-xl">✅</span>
                  <span className="font-medium">Vote submitted!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Poll History */}
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            📊 Previous Polls
          </h3>
          
          <div className="space-y-6">
            {polls.filter(poll => !poll.isActive).map((poll) => (
              <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-brand-charcoal">{poll.question}</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {poll.session}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {poll.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-brand-charcoal">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-brand-brown h-2 rounded-full transition-all duration-300"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-brand-burgundy font-medium w-12 text-right">
                          {option.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Total votes: {poll.totalVotes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="card mt-8 bg-brand-cream/50">
          <h3 className="text-lg font-semibold text-brand-brown mb-3">
            💡 How it works
          </h3>
          <div className="text-sm text-brand-charcoal space-y-2">
            <p>• <strong>Live Reactions:</strong> Tap emojis to react to what&apos;s happening in real-time</p>
            <p>• <strong>Active Polls:</strong> Vote on current questions - results update live</p>
            <p>• <strong>Multiple Choice:</strong> Some polls allow multiple selections</p>
            <p>• <strong>Previous Polls:</strong> View results from earlier sessions</p>
            <p>• <strong>Stay Engaged:</strong> New polls will appear throughout the event</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LivePolls
