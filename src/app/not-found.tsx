'use client'

export default function NotFound() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">💄</div>
        <h2 className="text-3xl font-bold text-brand-brown mb-4">
          Page Not Found
        </h2>
        <p className="text-brand-charcoal mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the beautiful event experience.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="btn-primary text-lg px-8 py-3"
        >
          🏠 Back to Event Hub
        </button>
      </div>
    </div>
  )
}
