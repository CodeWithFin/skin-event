# Vitapharm Beauty & Academy Launch Event App

A comprehensive web application for the Vitapharm Beauty & Academy launch event scheduled for July 5, 2025. This modern, responsive application provides a complete event experience with real-time features, e-commerce capabilities, and interactive engagement tools.

## 🌟 Features

### ✅ Core Event Features (All Implemented)
- **📅 Real-time Event Schedule** - Interactive timetable with current session tracking and countdown
- **📸 HD Photo Gallery** - Real-time photo uploads with likes and moderation
- **🛍️ Sip & Shop** - Complete e-commerce with products, courses, and treatments
- **🎮 Spin & Win** - Interactive prize wheel game with rewards
- **💬 Live Chat** - Real-time messaging with emoji reactions and file sharing
- **📝 Registration System** - Google Form integration with QR code generation
- **📱 QR Code Check-In** - Digital check-in system for registered attendees
- **📊 Live Polls & Reactions** - Real-time audience engagement and voting
- **📰 Event Highlights** - Live news feed with announcements and updates

### ✅ Advanced Features (All Implemented)  
- **🏆 Leaderboard & Social Wall** - Real-time user rankings based on engagement
- **� Post-Event Memory Mode** - Event recap, photo gallery, and feedback collection
- **🌍 Multilingual Support** - English/Kiswahili language switching
- **📱 Responsive Navigation** - Organized mobile-first navigation
- **⚡ Real-time Backend** - Supabase integration for live updates
- **🔄 Loading Screen** - Polished app initialization experience
- **🎨 Brand-Consistent UI** - Vitapharm brand colors and modern design

### 🚫 Removed Features (As Requested)
- ❌ **Sponsor Zone** - Removed completely
- ❌ **Admin Dashboard** - Removed for user-focused experience

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Real-time database)
- **QR Code:** react-qr-code, qrcode
- **Real-time:** Supabase Realtime subscriptions
- **Internationalization:** Custom i18n implementation
- **Development:** ESLint, Prettier
- **Deployment:** Vercel-ready

### 🎯 Core Features
- **Real-time Event Timetable** - Live schedule with current session highlighting and countdown
- **HD Photo Gallery** - Upload and share high-quality photos with real-time updates
- **Sip & Shop** - Browse and purchase beauty products, courses, and treatments
- **Spin to Win** - Interactive prize wheel with exclusive rewards
- **Live Chat & Guestbook** - Real-time messaging with reactions and replies
- **Sponsor Zone** - Showcase sponsors with exclusive offers and social links

### 🔧 Admin Features
- **Admin Dashboard** - Monitor registrations, photos, messages, and site stats
- **Photo Moderation** - Approve/reject uploaded photos
- **Live Announcements** - Send real-time announcements to all users
- **Registration Management** - Track event registrations and check-ins

### 🎨 Design Features
- **Brand Colors** - Rich brown (#6B3F27), Burgundy (#8B2C3E), Cream (#F9F4EF)
- **Responsive Design** - Optimized for mobile and desktop
- **Modern UI** - Clean, professional interface with smooth animations
- **Accessibility** - WCAG compliant design patterns

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **State Management**: React hooks
- **Icons**: Unicode emojis for universal compatibility
- **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CodeWithFin/skin-event.git
cd skin-event
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access
- Visit `/admin` route
- Default password: `vitapharm2025`

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard route
│   ├── globals.css     # Global styles and Tailwind config
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Main home page
├── components/
│   ├── AdminDashboard.tsx  # Admin panel component
│   ├── Hero.tsx            # Landing page hero section
│   ├── LiveChat.tsx        # Live chat and guestbook
│   ├── Navigation.tsx      # Main navigation component
│   ├── PhotoGallery.tsx    # Photo upload and gallery
│   ├── SipShop.tsx         # Products and services showcase
│   ├── SpinToWin.tsx       # Prize wheel game
│   ├── SponsorZone.tsx     # Sponsor showcase
│   └── Timetable.tsx       # Real-time event schedule
```

## Event Details

**Date**: July 5, 2025  
**Time**: 11:00 AM - 6:00 PM  
**Venue**: Vitapharm Beauty & Academy  

### Event Schedule
- 11:00AM–11:30AM: Red Carpet & Guest Arrival
- 11:30AM–12:15PM: Opening Remarks & Ribbon Cutting
- 12:15PM–1:00PM: Panel Discussion #1: "Glow Up or Shut Up"
- 1:00PM–2:30PM: Sip, Shop & Skin Consultations #1
- 2:30PM–3:15PM: Panel Discussion #2: "The Real Glow Code"
- 3:15PM–5:30PM: Sip & Shop Marathon + Fun Stations #2
- 5:30PM–6:00PM: Raffle Draw, Group Photo, Cake Cutting & Toast

## Deployment

The app is configured for deployment on Vercel, Netlify, or any Node.js hosting platform.

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Vitapharm Beauty & Health.

## Support

For technical support or questions, contact the development team.

---

Built with ❤️ for the Vitapharm Beauty & Academy Launch Event
