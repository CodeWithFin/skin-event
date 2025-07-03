'use client'

import { useState, useRef } from 'react'

interface CheckInData {
  id: string
  name: string
  email: string
  event: string
  date: string
  checkedIn: boolean
  checkInTime?: string
}

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState<CheckInData | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [checkInHistory, setCheckInHistory] = useState<CheckInData[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processQRCode = (qrData: string) => {
    try {
      const data = JSON.parse(qrData) as CheckInData
      
      // Validate QR code format
      if (!data.id || !data.name || !data.event) {
        throw new Error('Invalid QR code format')
      }

      // Check if already checked in
      const alreadyCheckedIn = checkInHistory.find(record => record.id === data.id)
      if (alreadyCheckedIn) {
        alert(`${data.name} has already checked in at ${alreadyCheckedIn.checkInTime}`)
        return
      }

      // Process check-in
      const checkedInData = {
        ...data,
        checkedIn: true,
        checkInTime: new Date().toLocaleString()
      }

      setScannedData(checkedInData)
      setCheckInHistory(prev => [checkedInData, ...prev])
      
      // In production, this would sync with backend
      console.log('Check-in successful:', checkedInData)
      
    } catch (error) {
      alert('Invalid QR code. Please try again.')
      console.error('QR parsing error:', error)
    }
  }

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      alert('Please enter a registration code')
      return
    }
    
    // Simulate manual check-in
    const mockData = {
      id: manualCode,
      name: 'Manual Entry',
      email: 'manual@entry.com',
      event: 'Vitapharm Beauty & Academy Launch',
      date: '2025-07-05',
      checkedIn: true,
      checkInTime: new Date().toLocaleString()
    }
    
    setScannedData(mockData)
    setCheckInHistory(prev => [mockData, ...prev])
    setManualCode('')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // In a real implementation, you would use a QR code reading library
    // For demo purposes, we'll simulate reading a QR code from an image
    const reader = new FileReader()
    reader.onload = () => {
      // Simulate QR code detection
      const mockQRData = {
        id: `VPH-${Date.now()}`,
        name: 'John Doe',
        email: 'john@example.com',
        event: 'Vitapharm Beauty & Academy Launch',
        date: '2025-07-05',
        checkedIn: false
      }
      processQRCode(JSON.stringify(mockQRData))
    }
    reader.readAsDataURL(file)
  }

  const resetScanner = () => {
    setScannedData(null)
    setIsScanning(false)
  }

  const exportCheckInData = () => {
    const csvContent = [
      ['Name', 'Email', 'Registration ID', 'Check-in Time'],
      ...checkInHistory.map(record => [
        record.name,
        record.email,
        record.id,
        record.checkInTime || ''
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vitapharm-checkins-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            📱 Event Check-In
          </h1>
          <p className="text-lg text-brand-charcoal">
            Scan QR codes or enter registration codes manually
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-brand-brown mb-2">
              {checkInHistory.length}
            </div>
            <div className="text-sm text-brand-charcoal">Total Check-ins</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-brand-burgundy mb-2">
              {checkInHistory.filter(r => r.checkInTime?.includes(new Date().toDateString())).length}
            </div>
            <div className="text-sm text-brand-charcoal">Today&apos;s Check-ins</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {checkInHistory.length > 0 ? '✓' : '○'}
            </div>
            <div className="text-sm text-brand-charcoal">Scanner Status</div>
          </div>
        </div>

        {/* Scanner Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Scanner */}
          <div className="card">
            <h3 className="text-xl font-semibold text-brand-brown mb-4">
              📸 QR Code Scanner
            </h3>
            
            {!scannedData ? (
              <div className="space-y-4">
                {/* Camera Scanner (Simulated) */}
                <div className="border-2 border-dashed border-brand-pink rounded-lg p-8 text-center bg-brand-cream/50">
                  <div className="text-4xl mb-4">📷</div>
                  <p className="text-brand-charcoal mb-4">
                    Camera scanner would appear here in production
                  </p>
                  <button
                    onClick={() => setIsScanning(!isScanning)}
                    className={`btn-primary ${isScanning ? 'opacity-50' : ''}`}
                  >
                    {isScanning ? '⏹️ Stop Camera' : '📸 Start Camera Scanner'}
                  </button>
                </div>

                {/* File Upload Alternative */}
                <div className="text-center">
                  <p className="text-sm text-brand-charcoal mb-2">Or upload QR code image:</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                  >
                    📁 Upload QR Image
                  </button>
                </div>

                {/* Manual Entry */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-brand-brown mb-2">Manual Entry</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Enter registration code..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown"
                    />
                    <button
                      onClick={handleManualEntry}
                      className="btn-primary"
                    >
                      ✓ Check In
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Check-in Success */
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">
                  Check-in Successful!
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-green-800">{scannedData.name}</p>
                  <p className="text-sm text-green-600">{scannedData.email}</p>
                  <p className="text-xs text-green-500">ID: {scannedData.id}</p>
                  <p className="text-xs text-green-500">Time: {scannedData.checkInTime}</p>
                </div>
                <button
                  onClick={resetScanner}
                  className="btn-primary"
                >
                  📱 Scan Next Person
                </button>
              </div>
            )}
          </div>

          {/* Check-in History */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-brand-brown">
                📋 Recent Check-ins
              </h3>
              {checkInHistory.length > 0 && (
                <button
                  onClick={exportCheckInData}
                  className="btn-secondary text-sm"
                >
                  💾 Export CSV
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {checkInHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-3xl mb-2">👥</div>
                  <p>No check-ins yet</p>
                </div>
              ) : (
                checkInHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-brand-brown">{record.name}</p>
                      <p className="text-sm text-brand-charcoal">{record.email}</p>
                      <p className="text-xs text-gray-500">
                        {record.checkInTime} • ID: {record.id}
                      </p>
                    </div>
                    <div className="text-green-500 text-xl">✓</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            📖 Instructions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-brand-charcoal">
            <div>
              <h4 className="font-semibold mb-2">QR Code Scanning:</h4>
              <ul className="space-y-1">
                <li>• Point camera at attendee&apos;s QR code</li>
                <li>• Ensure good lighting for best results</li>
                <li>• Code will scan automatically when detected</li>
                <li>• Use manual entry if QR code won&apos;t scan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Troubleshooting:</h4>
              <ul className="space-y-1">
                <li>• Check internet connection for syncing</li>
                <li>• Restart app if camera stops working</li>
                <li>• Contact admin for invalid registrations</li>
                <li>• Export data regularly as backup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeScanner
