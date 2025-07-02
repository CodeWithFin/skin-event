# Vitapharm Beauty & Academy Launch Event Web App

A comprehensive event web application for the Vitapharm Beauty & Academy Launch happening on July 5, 2025.

## Features

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
