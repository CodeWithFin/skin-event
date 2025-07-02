'use client'

import { useState } from 'react'

interface Sponsor {
  id: number
  name: string
  logo: string
  description: string
  offer: string
  website: string
  social: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
}

const SponsorZone = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)

  const sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'Vitapharm Beauty & Health',
      logo: '/api/placeholder/200/100',
      description: 'Your premier destination for beauty and health solutions. Offering professional consultations, premium products, and expert training.',
      offer: 'Free skin consultation + 20% off all treatments during the event',
      website: 'https://vitapharm.com',
      social: {
        instagram: '@vitapharmbeauty',
        facebook: 'VitapharmBeauty'
      },
      tier: 'platinum'
    },
    {
      id: 2,
      name: 'La Roche-Posay',
      logo: '/api/placeholder/200/100',
      description: 'Dermatologist-recommended skincare solutions for sensitive skin. Trusted by professionals worldwide.',
      offer: 'Buy 2 products, get 1 free + complimentary skin analysis',
      website: 'https://laroche-posay.com',
      social: {
        instagram: '@larocheposay',
        facebook: 'LaRochePosay'
      },
      tier: 'gold'
    },
    {
      id: 3,
      name: 'CeraVe',
      logo: '/api/placeholder/200/100',
      description: 'Developed with dermatologists, CeraVe provides essential skincare for all skin types.',
      offer: '30% off all CeraVe products + free travel-size cleanser',
      website: 'https://cerave.com',
      social: {
        instagram: '@cerave',
        facebook: 'CeraVe'
      },
      tier: 'gold'
    },
    {
      id: 4,
      name: 'Korean Beauty Co.',
      logo: '/api/placeholder/200/100',
      description: 'Authentic Korean skincare and cosmetics bringing K-beauty trends to Africa.',
      offer: 'K-beauty starter kit for KES 2,000 (worth KES 4,000)',
      website: 'https://kbeauty.co.ke',
      social: {
        instagram: '@kbeautykenya',
        facebook: 'KBeautyKenya'
      },
      tier: 'silver'
    },
    {
      id: 5,
      name: 'LA Girl Cosmetics',
      logo: '/api/placeholder/200/100',
      description: 'Affordable, high-quality makeup for every skin tone and style.',
      offer: 'Mix & match: Any 3 items for KES 400',
      website: 'https://lagirl.com',
      social: {
        instagram: '@lagirlcosmetics',
        facebook: 'LAGirlCosmetics'
      },
      tier: 'silver'
    },
    {
      id: 6,
      name: 'Perfume Palace',
      logo: '/api/placeholder/200/100',
      description: 'Luxury and designer fragrances for every occasion.',
      offer: 'Buy any perfume, get 50% off second fragrance',
      website: 'https://perfumepalace.ke',
      social: {
        instagram: '@perfumepalaceke',
        facebook: 'PerfumePalaceKenya'
      },
      tier: 'bronze'
    }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
      case 'gold':
        return 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-white'
      case 'silver':
        return 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800'
      case 'bronze':
        return 'bg-gradient-to-br from-orange-300 to-orange-600 text-white'
      default:
        return 'bg-gray-100'
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return '💎 Platinum Partner'
      case 'gold':
        return '🥇 Gold Sponsor'
      case 'silver':
        return '🥈 Silver Sponsor'
      case 'bronze':
        return '🥉 Bronze Sponsor'
      default:
        return '🤝 Partner'
    }
  }

  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = []
    }
    acc[sponsor.tier].push(sponsor)
    return acc
  }, {} as Record<string, Sponsor[]>)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
            🤝 Our Amazing Sponsors
          </h1>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Meet our incredible partners who make this event possible. Don&apos;t miss their exclusive offers!
          </p>
        </div>

        {/* Sponsors by Tier */}
        {(['platinum', 'gold', 'silver', 'bronze'] as const).map((tier) => (
          sponsorsByTier[tier] && (
            <div key={tier} className="mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-brand-brown mb-2">
                  {getTierBadge(tier)}
                </h2>
              </div>

              <div className={`grid gap-6 ${
                tier === 'platinum' ? 'grid-cols-1 lg:grid-cols-1' :
                tier === 'gold' ? 'grid-cols-1 lg:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {sponsorsByTier[tier].map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className={`card hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      tier === 'platinum' ? 'lg:p-8' : ''
                    }`}
                    onClick={() => setSelectedSponsor(sponsor)}
                  >
                    {/* Tier Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTierColor(tier)}`}>
                        {getTierBadge(tier)}
                      </span>
                    </div>

                    {/* Logo */}
                    <div className="text-center mb-4">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="mx-auto h-16 w-auto object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-brand-brown mb-2">
                        {sponsor.name}
                      </h3>
                      <p className="text-sm text-brand-charcoal mb-4 line-clamp-3">
                        {sponsor.description}
                      </p>

                      {/* Offer Highlight */}
                      <div className="bg-brand-pink/30 border border-brand-pink rounded-lg p-3 mb-4">
                        <div className="text-xs font-medium text-brand-burgundy mb-1">
                          🎁 EXCLUSIVE OFFER
                        </div>
                        <div className="text-sm font-semibold text-brand-brown">
                          {sponsor.offer}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-3">
                        {sponsor.social.instagram && (
                          <a
                            href={`https://instagram.com/${sponsor.social.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            📷
                          </a>
                        )}
                        {sponsor.social.facebook && (
                          <a
                            href={`https://facebook.com/${sponsor.social.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            📘
                          </a>
                        )}
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-burgundy hover:text-brand-burgundy/80 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          🌐
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Special Offers Section */}
        <div className="card mt-12 bg-gradient-to-r from-brand-pink to-brand-peach">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-brown mb-4">
              🎊 Today&apos;s Special Offers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">💄</div>
                <h3 className="font-semibold text-brand-brown mb-1">Makeup Bundle</h3>
                <p className="text-sm text-brand-charcoal">Any 3 makeup items for KES 1,200</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">🧴</div>
                <h3 className="font-semibold text-brand-brown mb-1">Skincare Set</h3>
                <p className="text-sm text-brand-charcoal">Complete routine for KES 2,500</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-2xl mb-2">🌸</div>
                <h3 className="font-semibold text-brand-brown mb-1">Fragrance Deal</h3>
                <p className="text-sm text-brand-charcoal">Buy 1 get 50% off second perfume</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="card mt-8 text-center">
          <h3 className="text-xl font-semibold text-brand-brown mb-4">
            🙏 Thank You to Our Sponsors
          </h3>
          <p className="text-brand-charcoal max-w-2xl mx-auto">
            We&apos;re grateful to all our sponsors and partners who make the Vitapharm Beauty & Academy Launch possible. 
            Their support helps us bring you this amazing experience with exclusive offers, premium products, and expert insights.
          </p>
        </div>
      </div>

      {/* Sponsor Detail Modal */}
      {selectedSponsor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTierColor(selectedSponsor.tier)}`}>
                  {getTierBadge(selectedSponsor.tier)}
                </span>
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  src={selectedSponsor.logo}
                  alt={selectedSponsor.name}
                  className="mx-auto h-20 w-auto object-contain mb-4"
                />
                <h2 className="text-2xl font-bold text-brand-brown mb-2">
                  {selectedSponsor.name}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-brown mb-2">About</h3>
                  <p className="text-brand-charcoal">{selectedSponsor.description}</p>
                </div>

                <div className="bg-brand-pink/20 border border-brand-pink rounded-lg p-4">
                  <h3 className="font-semibold text-brand-burgundy mb-2">🎁 Exclusive Event Offer</h3>
                  <p className="text-brand-brown font-medium">{selectedSponsor.offer}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-brown mb-2">Connect</h3>
                  <div className="flex gap-4">
                    <a
                      href={selectedSponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      🌐 Visit Website
                    </a>
                    {selectedSponsor.social.instagram && (
                      <a
                        href={`https://instagram.com/${selectedSponsor.social.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2"
                      >
                        📷 Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SponsorZone
