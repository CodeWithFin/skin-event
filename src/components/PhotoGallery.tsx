'use client'

import { useState, useRef } from 'react'

interface Photo {
  id: number
  url: string
  caption: string
  timestamp: Date
  likes: number
  uploader: string
  isApproved: boolean
}

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: '/api/placeholder/400/300',
      caption: 'Beautiful makeup transformation! ✨',
      timestamp: new Date(),
      likes: 15,
      uploader: 'Sarah M.',
      isApproved: true
    },
    {
      id: 2,
      url: '/api/placeholder/400/300',
      caption: 'Loving the skincare consultation 💆‍♀️',
      timestamp: new Date(),
      likes: 23,
      uploader: 'Jessica K.',
      isApproved: true
    },
    {
      id: 3,
      url: '/api/placeholder/400/300',
      caption: 'Amazing products at the Sip & Shop! 🛍️',
      timestamp: new Date(),
      likes: 8,
      uploader: 'Maria L.',
      isApproved: true
    }
  ])
  
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadCaption, setUploadCaption] = useState('')
  const [filterMode, setFilterMode] = useState<'all' | 'recent' | 'popular'>('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      const newPhoto: Photo = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        caption: uploadCaption || 'New photo from the event!',
        timestamp: new Date(),
        likes: 0,
        uploader: 'You',
        isApproved: false // Pending approval
      }

      setPhotos([newPhoto, ...photos])
      setUploadCaption('')
      setIsUploading(false)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 2000)
  }

  const likePhoto = (photoId: number) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ))
  }

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a')
    link.href = photo.url
    link.download = `vitapharm-event-${photo.id}.jpg`
    link.click()
  }

  const getFilteredPhotos = () => {
    const approvedPhotos = photos.filter(photo => photo.isApproved)
    
    switch (filterMode) {
      case 'recent':
        return approvedPhotos.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      case 'popular':
        return approvedPhotos.sort((a, b) => b.likes - a.likes)
      default:
        return approvedPhotos
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            📸 Event Gallery
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Share your beautiful moments from the Vitapharm Beauty & Academy Launch event!
          </p>
        </div>

        {/* Upload Section */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            📤 Upload Your Photos
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Add a caption
              </label>
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Share what makes this moment special..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`btn-primary flex items-center gap-2 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    📁 Choose Photo
                  </>
                )}
              </button>
              
              <span className="text-sm text-brand-charcoal">
                Upload HD photos (max 10MB)
              </span>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                filterMode === 'all'
                  ? 'bg-brand-brown text-white'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              All Photos
            </button>
            <button
              onClick={() => setFilterMode('recent')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                filterMode === 'recent'
                  ? 'bg-brand-brown text-white'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              Most Recent
            </button>
            <button
              onClick={() => setFilterMode('popular')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                filterMode === 'popular'
                  ? 'bg-brand-brown text-white'
                  : 'text-brand-brown hover:bg-brand-pink/50'
              }`}
            >
              Most Liked
            </button>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredPhotos().map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedPhoto(photo)}
                />
                {!photo.isApproved && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Pending Review
                  </div>
                )}
              </div>

              {/* Photo Info */}
              <div className="p-4">
                <p className="text-sm text-brand-charcoal mb-2 line-clamp-2">
                  {photo.caption}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>by {photo.uploader}</span>
                  <span>{formatTimeAgo(photo.timestamp)}</span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => likePhoto(photo.id)}
                    className="flex items-center gap-1 text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                  >
                    ❤️ {photo.likes}
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="text-brand-brown hover:text-brand-brown/80 transition-colors"
                    >
                      🔍
                    </button>
                    <button
                      onClick={() => downloadPhoto(photo)}
                      className="text-brand-brown hover:text-brand-brown/80 transition-colors"
                    >
                      📥
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Photos Notice */}
        {photos.some(photo => !photo.isApproved) && (
          <div className="card mt-8 bg-yellow-50 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              ⏳ Photos Under Review
            </h3>
            <p className="text-yellow-700">
              Your uploaded photos are being reviewed by our moderators and will appear in the gallery once approved.
            </p>
          </div>
        )}

        {/* Empty State */}
        {getFilteredPhotos().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-brand-brown mb-2">
              No photos yet
            </h3>
            <p className="text-brand-charcoal">
              Be the first to share your beautiful moments from the event!
            </p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-lg text-brand-charcoal mb-4">
                {selectedPhoto.caption}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    by {selectedPhoto.uploader}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(selectedPhoto.timestamp)}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => likePhoto(selectedPhoto.id)}
                    className="btn-secondary flex items-center gap-1"
                  >
                    ❤️ {selectedPhoto.likes}
                  </button>
                  <button
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="btn-primary flex items-center gap-1"
                  >
                    📥 Download HD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
